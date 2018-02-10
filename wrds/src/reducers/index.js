import {combineReducers} from 'redux'
import words from './words'
import filter from './filter'

const wordsApp = combineReducers({
    words,
    filter
});

export default wordsApp