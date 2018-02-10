var Word = require("../words/word")

let allWords = getWordList();

const words = (state = allWords, action) => {
    return state;
}

function getWordList(){
    var wordlist = [];
    var words = require("../../data/words.json");
    words.words.forEach(element => {
        var word = new Word(element);
        wordlist.push(word);
    });
    console.log("getWordList length : " + wordlist.length);
    return wordlist;
}

export default words