import { LOAD, SHOW, SHOW_PLAYLIST_POPUP } from '../constants/actiontypes'
import {loaded, updatePlaylists, addPlaylist} from '../actions'
var {getPlaylists, getPlaylist} = require('../blip/playlists')

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
            getPlaylists(getPlaylistsCallback, store, state.dates.startDate, state.dates.endDate, 1);
            break;
        case SHOW_PLAYLIST_POPUP:
            var id = getPlaylistId(store.getState(), action.date);
            if (id) {
                getPlaylist(getPlaylistCallback, store, id, 1);
            }
            
            break;
        }
    next(action);
};

function getPlaylistId(state, date){
    console.log("IsArray ", Array.isArray(state.playlists.playlists));

    for (var playlist in state.playlists.playlists) {
        if(date.dateString == playlist) {
            console.log (state.playlists.playlists[playlist].id);
            return state.playlists.playlists[playlist].id;
        }
    }
    return null;
}

function getPlaylistsCallback(error, data, store) {
    if (!error) {
        store.dispatch (updatePlaylists(data));
    }
}

function getPlaylistCallback(error, data, store) {
    if (!error) {
        store.dispatch (addPlaylist(data));
    }
}

export default api
