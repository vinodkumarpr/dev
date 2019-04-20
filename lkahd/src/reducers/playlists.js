import { UPDATE_PLAYLISTS, ADD_PLAYLIST, SHOW_PLAYLIST_POPUP, CLOSE_PLAYLIST_POPUP } from '../constants/actiontypes'

const playlists = (state = { playlists: null, playliststatus : {} }, action) => {
    switch (action.type) {
        case UPDATE_PLAYLISTS:
            return Object.assign({}, state, {
                playlists: action.playlists
            });

        case ADD_PLAYLIST:
            var playliststatus = state.playliststatus;
            playliststatus[action.playlist.id] = action.playlist;
            return Object.assign({}, state, {
                playliststatus : playliststatus 
            });

        case SHOW_PLAYLIST_POPUP:
            return Object.assign({}, state, {
                selectedDate: action.date,
                showPlaylistPopup: true
            });

        case CLOSE_PLAYLIST_POPUP:
            return Object.assign({}, state, {
                showPlaylistPopup: false
            });
        default:
            return state;
    }
}

export default playlists
