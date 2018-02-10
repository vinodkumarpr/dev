import {combineReducers} from 'redux'
import words from './words'
import filter from './filter'
import display from './display'

const wordsApp = combineReducers({
    words,
    filter,
    display
});

export default wordsApp