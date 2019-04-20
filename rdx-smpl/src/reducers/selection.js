import { SET_SELECTION } from '../constants/actiontypes'
import {Selections} from '../constants/constants'

const selection = (state = Selections.SELECT_COMPLETED, action) => {
  console.log("selection reducer : action.type " + action.type)
  switch (action.type) {
    case SET_SELECTION:
      return action.selection
    default:
      return state
  }
}

export default selection
