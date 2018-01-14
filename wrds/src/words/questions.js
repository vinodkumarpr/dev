var Word = require("./word.js")

class Questions {
    constructor(wordlist){
        this.wordlist = wordlist;
    }
    report(){
        console.log("Questions are ...");
    }
}

module.exports = Questions;
