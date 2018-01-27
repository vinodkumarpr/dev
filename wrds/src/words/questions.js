var Word = require("./word.js")
var randomizer = require("./randomizer.js")
var questionselection = require("../../data/questionselection.json")

const NumberOfAnswerOptions = 5;
const NoneOfTheAboveOption = "None of the above";

function getQuestions(wordlist, numQuestions) {
    this.wordlist = wordlist;
    this.numQuestions = numQuestions;

    var frequencies = questionselection.questiontypes.map(
        type => type.frequency
    )
    var questiontypes = randomizer.getFrequencyFilledList(frequencies, numQuestions);

    var frequencies = questionselection.answertypes.map(
        type => type.frequency
    )
    var answertypes = randomizer.getFrequencyFilledList(frequencies, numQuestions);

    var words = randomizer.getRandomizedList(wordlist, numQuestions);

    var questions = [];
    for (var i = 0; i < numQuestions; i++) {
        var question = makeQuestion(words[i],
             questionselection.questiontypes[questiontypes[i]].type,
             questionselection.answertypes[answertypes[i]].type);
        if (!isValidQuestion(question)) {
            console.log("Falling for possible question")
            question = makePossibleQuestion(words[i], questionselection.answertypes[answertypes[i]].type);
        }

        if (isValidQuestion(question)) {
            printQuestion(question);
            questions.push(question);
        }
    }

    return questions;
}

function printQuestion(question) {
    console.log(question.question);
    question.answer.options.forEach(option => console.log("   > " + option));

    console.log("answer is : " + question.answer.answer);
}

function isValidQuestion(question){
    if (!question) return false;
    if (question.answer.options.length < NumberOfAnswerOptions) return false;

    return true;
}

function makeQuestion(word, questiontype, answertype) {
    var question = null;
    if (questiontype == "is synonym") {
        question = makeSynonymQuestion(word, questiontype, answertype);
    } else if (questiontype == "is not synonym") {
        question = makeNotSynonymQuestion(word, questiontype, answertype);
    } else if (questiontype == "is antonym") {
        question = makeAntonymQuestion(word, questiontype, answertype);
    } else if (questiontype == "is not antonym") {
        question = makeNotAntonymQuestion(word, questiontype, answertype);
    } else if (questiontype == "sentence") {
        question = makeSentenceQuestion(word, questiontype, answertype);
    } 
    return question;
}

function makePossibleQuestion(word, answertype) {
    var list = [];
    for (var i = 0; i < NumberOfAnswerOptions; i++) list.push(i);

    list = randomizer.getRandomizedList(list, list.length);
    
    while (list.length > 0) {
        var question = makeQuestion(word, questionselection.questiontypes[list[0]].type, answertype);
        if (isValidQuestion(question)) {
            return question;
        }
        list.splice(0, 1);
    }
    return null;
}

function makeSynonymQuestion(word, questiontype, answertype) {
    var answerOptions = makeAnswerOptions(answertype, word.synonyms(), word.synonymQuestionOptions());

    var question = {
        "question": "Select a synonym of " + word.word(),
        "answer": answerOptions
    };

    return question;
}

function makeNotSynonymQuestion(word, questiontype, answertype) {
    var answerOptions = makeAnswerOptions(answertype, word.synonymQuestionOptions(), word.synonyms());

    var question = {
        "question": "Select word that is not a synonym of " + word.word(),
        "answer": answerOptions
    };

    return question;
}

function makeAntonymQuestion(word, questiontype, answertype) {
    var answerOptions = makeAnswerOptions(answertype, word.antonyms(), word.antonymQuestionOptions());

    var question = {
        "question": "Select an antonym of " + word.word(),
        "answer": answerOptions
    };

    return question;
}

function makeNotAntonymQuestion(word, questiontype, answertype) {
    var answerOptions = makeAnswerOptions(answertype, word.antonymQuestionOptions(), word.antonyms());

    var question = {
        "question": "Select word that is not an antonym of " + word.word(),
        "answer": answerOptions
    };

    return question;
}

function makeSentenceQuestion(word, questiontype, answertype) {
    var answerOptions = makeAnswerOptions(answertype, [word.word()], word.synonymQuestionOptions());

    var questionSentence = randomizer.getRandomizedList(word.sentenceQuestions(), 1)
    var question = {
        "question": questionSentence[0],
        "answer": answerOptions
    };

    return question;
}


function makeAnswerOptions(answertype, correctOptions, incorrectOptions) {
    var options = [];
    var answer = "";

    if (answertype == "straight") {
        options = randomizer.getRandomizedList(incorrectOptions, NumberOfAnswerOptions - 1);
        answer = randomizer.getRandomizedList(correctOptions, 1)[0];
        options.push(answer);
        options = randomizer.getRandomizedList(options, options.length);
    } else if (answertype == "none of the above with correct") {
        options = randomizer.getRandomizedList(incorrectOptions, NumberOfAnswerOptions - 2);
        answer = randomizer.getRandomizedList(correctOptions, 1)[0];
        options.push(answer);
        options = randomizer.getRandomizedList(options, options.length);

        options.push(NoneOfTheAboveOption);
    } else if (answertype == "none of the above without correct") {
        options = randomizer.getRandomizedList(incorrectOptions, NumberOfAnswerOptions - 1);
        options.push(NoneOfTheAboveOption);
        answer = NoneOfTheAboveOption;
    }

    var answerOptions = {
        "options": options,
        "answer": answer
    };

    return answerOptions;
}

function report() {
    console.log("Questions are ...");
}


module.exports.getQuestions = getQuestions;
