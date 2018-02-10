import { DISPLAY_WORD, DISPLAY_QUIZ } from '../constants/actiontypes'

var Questions = require("../words/questions.js")
var randomizer = require("../words/randomizer.js")

// import { QUIZ_LOAD, QUIZ_START,
//     QUIZ_FINISH, QUIZ_START_QUESTION, QUIZ_ANSWERED_QUESTION, 
//     QUIZ_COMPLETE_QUESTION} from '../constants/actiontypes'
import { QUIZ_LOAD } from '../constants/actiontypes'
import {loadQuiz, startQuiz, startQuestion, completeQuestion, finishQuiz} from '../actions'


const quizapi = store => next => action => {
    switch (action.type) {
        case QUIZ_LOAD:
            var words = store.getState().words;
            var questions = loadQuestion(words, action.totalQuestions);
            store.dispatch (startQuiz(questions));
            break;
        //case QUIZ_TIMER_ELAPSED:
          //  break;
        //case QUIZ_ANSWERED_QUESTION:
          //  break;
        }
    next(action);
};

 function loadQuestion (words, numQuestions){
    var numQuestions = words.length < numQuestions ?  words.length : numQuestions;
    var list = randomizer.getRandomizedList(words, numQuestions);
    var questions = Questions.getQuestions(list, numQuestions);
    
    return questions;
}

export default quizapi