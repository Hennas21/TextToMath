import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const  SpellCorrector = require('spelling-corrector');
const spellCorrector = new SpellCorrector();
import { unitMap } from './Place-values/unit-values.js';
class TextToMath {
    calc(val) {
        if (!this.containsOnlyLetters(val)) return "Oops! Not a string value.";
        else {
            const inputArray = this.setInputInArray(val.toLowerCase());
            this.testValues(inputArray);
            //return inputArray
            // return this.convert(inputArray);
        }
    }

    testValues(inputArray) {
        const tempArray = [];
        for (let i = 0; i < inputArray.length; i++) {
            let word = inputArray[i];
            let value = unitMap.get(word);
            console.log(value);
        }
    }
    convert(inputArray){
        const converted = [];
        return converted;
    }

    setInputInArray(input) {
        spellCorrector.loadDictionary();
        const inputArray =[];
        let word =""
        for (let i = 0; i <= input.length; i++) {
            if(i+1 === input.length) {
                word += input.charAt(i);
                inputArray.push(word);
                word = "";
            }
            if(input.charAt(i) !== " " && input.charAt(i) !== "-") {
                word += input.charAt(i);
            } else {
                inputArray.push(spellCorrector.correct(word));
                word = "";
            }
        }
        return inputArray
    }

    checkIfOperator() {

    }
    containsOnlyLetters(inputString) {
        return /^[a-zA-Z\s-]+$/.test(inputString);
    }

    // getNum(num){
    //     switch(sign) {
    //         case "one":
    //             // code block
    //             return +;
    //             break;
    //         case "two":
    //             // code block
    //             break;
    //         case "three":
    //             // code block
    //             return "+"
    //             break;
    //         case "four":
    //             // code block
    //             break;
    //         case "five":
    //             // code block
    //             return +;
    //             break;
    //         case "six":
    //             // code block
    //             break;
    //         case "seven":
    //             // code block
    //             return "+"
    //             break;
    //         case "eight":
    //             // code block
    //             break;
    //         case "nine":
    //             // code block
    //             return "+"
    //             break;
    //         case "*":
    //             // code block
    //             break;
    //         default:
    //         // code block
    //     }
    // }
}

const T = new TextToMath()
console.log(T.calc("one plus one plus two minus sixty-one"))
