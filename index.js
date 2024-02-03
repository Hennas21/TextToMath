import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const  SpellCorrector = require('spelling-corrector');
const spellCorrector = new SpellCorrector();
import { unitMap } from './Place-values/unit-values.js';
import { tensMap } from './Place-values/tens-values.js';
import { hundredsMap } from './Place-values/hundreds-values.js';
import { thousandsMap } from './Place-values/thousands-values.js';

class TextToMath {
    calc(val) {
        if (!this.containsOnlyLetters(val)) return "Oops! Not a string value.";
        else {
            const inputArray = this.setInputInArray(val.toLowerCase());
            const ar = this.testValues(inputArray);
            //return inputArray
            // return this.convert(inputArray);
            console.log(ar);
        }
    }

    testValues(inputArray) {
        const tempArray = [];
        for (let i = 0; i < inputArray.length; i++) {
            const word = inputArray[i];
            const value = this.getPossibleValue(word);
            if (value === undefined) {
                const operatorValue = this.testForOperator(word);
                if (operatorValue === undefined ) {
                    console.log(`ERROR: Unexpected word : "${word}"`)
                    let possibleFix = this.getPossibleValue(spellCorrector.correct(word));
                    if (possibleFix === undefined) {
                        possibleFix = this.testForOperator(spellCorrector.correct(word));
                        if (possibleFix === undefined) {
                            console.log("Could not correct spelling error.");
                            break;
                        } else {
                            if (i===0) {
                                console.log("Fixed, continuing.");
                                console.log("Input cannot start with an operator symbol.")
                                break;
                            }
                            console.log("Fixed, continuing.");
                            tempArray.push(possibleFix);
                        }
                    } else {
                        console.log("Fixed, continuing.");
                        tempArray.push(possibleFix);
                    }
                } else {
                    if (i===0) {
                        console.log("Input cannot start with an operator symbol.")
                        break;
                    }
                    tempArray.push(operatorValue);
                }
            } else {
                tempArray.push(value);
            }
        }
        return tempArray;
    }

    getPossibleValue (word) {
        let value = unitMap.get(word);
        if (value === undefined) {
            value = tensMap.get(word)
            if (value === undefined) {
                value = hundredsMap.get(word)
                if (value === undefined) {
                    value = thousandsMap.get(word)
                    if (value === undefined) {
                        return undefined;
                    } else {
                        return value;
                    }
                } else {
                    return value;
                }
            } else {
                return value;
            }
        } else {
            return value;
        }
    }

    testForOperator (operator) {
        switch (operator) {
            case 'plus':
                return '+';
            case 'minus':
                return '-';
            case 'times':
                return '*';
            case 'divided':
                return '/';
            case 'and':
                return '+';
            default:
                return undefined;
        }
    }


    convert(inputArray){
        const converted = [];
        return converted;
    }

    setInputInArray(input)  {
        spellCorrector.loadDictionary();
        const inputArray =[];
        let word ="";
        let prevWord = "";
        let flagNextWord = false;
        for (let i = 0; i < input.length; i++) {
            if (flagNextWord && input.charAt(i+1) === " " || input.charAt(i+1) === "") {
                word += input.charAt(i);
                let fnWord = prevWord+"-"+word;
                inputArray.push(fnWord);
                word = "";
                flagNextWord = false;
            } else if (input.charAt(i) === "-") {
                flagNextWord = true;
                prevWord = word;
                word = "";
            }
            else if(input.charAt(i) === " ") {
                prevWord = word;
                inputArray.push(word);
                word = "";
            }
            else {
                word += input.charAt(i);
            }
        }
        return inputArray
    }

    checkIfOperator() {

    }
    containsOnlyLetters(inputString) {
        return /^[a-zA-Z\s-]+$/.test(inputString);
    }
}

const T = new TextToMath()
console.log(T.calc("one plus one plu two minus sixty-one"))
