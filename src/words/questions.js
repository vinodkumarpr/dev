var Word = require("./word.js")

class Questions {
    constructor(wordlist, numQuestions){
        this.wordlist = wordlist;
        this.numQuestions = numQuestions;
    }
    report(){
        console.log("Questions are ...");
    }
}

module.exports = Questions;
