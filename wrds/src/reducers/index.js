import {combineReducers} from 'redux'
import words from './words'
import filter from './filter'
import display from './display'
import quiz from './quiz'

const wordsApp = combineReducers({
    words,
    filter,
    display,
    quiz
});

export default wordsApp