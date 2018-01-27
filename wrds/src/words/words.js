var Word = require("./word.js")
var Word = require("./word.js")

function getWordList(){
    var wordlist = [];
    var words = require("../../data/words.json");
    words.words.forEach(element => {
        var word = new Word(element);
        wordlist.push(word);
    });
    return wordlist;
}

module.exports.getWordList = getWordList;