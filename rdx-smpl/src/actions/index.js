import {SET_SELECTION, LOAD, LOADED} from '../constants/actiontypes'

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


  