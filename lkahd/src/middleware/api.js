import { LOAD, SHOW } from '../constants/actiontypes'
import {loaded, updatePlaylists} from '../actions'
var {getPlaylists} = require('../blip/playlists')

const api = store => next => action => {
    console.log("middlewaare (api) : action.type " + action.type)
    switch (action.type) {
        case LOAD:
            var state = store.getState();
            console.log("middlewaare : api : " + state.selection)
            store.dispatch (loaded());
            break;
        case SHOW:
            console.log("middlewaare : api : SHOW");
            var state = store.getState();
            getPlaylists(callback, store, state.dates.startDate, state.dates.endDate, 1);
            break;
        }
    next(action);
};

function callback(error, data, store) {
    if (!error) {
        store.dispatch (updatePlaylists(data));
    }
}

export default api