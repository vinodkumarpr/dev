import {combineReducers} from 'redux'
import selection from './selection'
import dates from './dates'
import playlists from "./playlists"

const appReducer = combineReducers({
    selection,
    dates,
    playlists
});

export default appReducer