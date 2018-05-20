import { UPDATE_PLAYLISTS } from '../constants/actiontypes'

const playlists = (state = { playlists : null }, action) => {
    switch (action.type) {
        case UPDATE_PLAYLISTS:
            return Object.assign({}, state, {
                playlists : action.playlists
            });
        default:
            return state;
    }
}

export default playlists
