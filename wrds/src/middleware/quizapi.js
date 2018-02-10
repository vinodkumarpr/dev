import { DISPLAY_WORD, DISPLAY_QUIZ } from '../constants/actiontypes'

var Questions = require("../words/questions.js")
var randomizer = require("../words/randomizer.js")

import { QUIZ_LOAD, QUIZ_START_QUESTION, QUIZ_ANSWERED_QUESTION, QUIZ_TIMER_ELAPSED } from '../constants/actiontypes'
import {loadQuiz, startQuiz, startQuestion, completeQuestion, finishQuiz, startQuizTimer} from '../actions'

let startQuestionTimeoutId;

function startQuestionAsync(dispatch, index){
    startQuestionTimeoutId = setTimeout( (dispatch, index) => {
        dispatch(startQuestion(index));
        clearTimeout(startQuestionTimeoutId);
    }, 0, dispatch, index);
}

let nextQuestionTimeoutId;

function nextQuestionAsync(store){
    var state = store.getState();
    if (state.quiz.index < state.quiz.totalQuestions - 1 ) {
        nextQuestionTimeoutId = setTimeout( (dispatch, index, duration) => {
            dispatch(startQuestion(index, duration));
            clearTimeout(nextQuestionTimeoutId);
        }, 0, store.dispatch, state.quiz.index + 1, state.quiz.duration);
    } else {

    }
}

const quizapi = store => next => action => {
    switch (action.type) {
        case QUIZ_LOAD:
            var words = store.getState().words;
            var questions = loadQuestion(words, action.totalQuestions);
            store.dispatch (startQuiz(questions, 5));
            nextQuestionAsync(store);
            break;
        case QUIZ_START_QUESTION:
            store.dispatch(startQuizTimer("quiz-timer", action.duration));
            break;
        case QUIZ_TIMER_ELAPSED:
            nextQuestionAsync(store);
            break;
        case QUIZ_ANSWERED_QUESTION:
            store.dispatch(stopQuizTimer("quiz-timer"));        
            nextQuestionAsync(store);
            break;
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