import {SET_SELECTION, LOAD, LOADED, SET_START_DATE, SET_END_DATE, SHOW, UPDATE_PLAYLISTS} from '../constants/actiontypes'

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
