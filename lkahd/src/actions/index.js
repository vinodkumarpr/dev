import {SET_SELECTION, LOAD, LOADED, SET_START_DATE, SET_END_DATE, SHOW, UPDATE_PLAYLISTS, ADD_PLAYLIST, SHOW_PLAYLIST_POPUP, CLOSE_PLAYLIST_POPUP} from '../constants/actiontypes'

export const setSelection = selection => ({
    type: SET_SELECTION,
    selection
  })


export const load = () => ({
    type: LOAD
  })


export const loaded = () => ({
    type: LOADED
  })

export const setStartDate = (date) => ({
  type : SET_START_DATE,
  startDate : date
})

export const setEndDate = (date) => ({
  type : SET_END_DATE,
  endDate : date
})

export const show = () => ({
  type : SHOW
})

export const updatePlaylists = (playlists) => ( {
  type : UPDATE_PLAYLISTS,
  playlists : playlists
})

export const addPlaylist = (playlist) => ( {
  type : ADD_PLAYLIST,
  playlist : playlist
})

export const showPlaylistPopup = (date) => ( {
  type : SHOW_PLAYLIST_POPUP,
  date : date
})

export const closePlaylistPopup = () => ( {
  type : CLOSE_PLAYLIST_POPUP
})
