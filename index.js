class TextToMath {
    calc(val) {

        if (!this.containsOnlyLetters(val)) return "Oops! Not a string value."
        else {
            const input = val.toLowerCase();
            const inputArray = this.setInputInArray(input);

            return inputArray
        }
    }
    setInputInArray(input) {
        const inputArray =[];
        let word =""
        for (let i = 0; i <= input.length; i++) {
            if(i+1 === input.length) {
                word += input.charAt(i);
                inputArray.push(word);
                word = "";
            }
            if(input.charAt(i) !== " ") {
                word += input.charAt(i);
            } else {
                inputArray.push(word);
                word = "";
            }
        }
        return inputArray
    }

    containsOnlyLetters(inputString) {
        return /^[a-zA-Z]+$/.test(inputString);
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
console.log(T.calc("asddas"))
