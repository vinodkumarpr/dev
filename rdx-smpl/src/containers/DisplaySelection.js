import { connect } from 'react-redux'
import Selection from '../components/Selection'
import { Selections } from '../constants/constants'
import {load} from '../actions'

const getSelection = (selection) => {
  switch (selection) {
    case Selections.SELECT_ALL:
      return "All"
    case Selections.SELECT_COMPLETED:
      return "Completed"
    case Selections.SELECT_ACTIVE:
      return "Active"
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => ({
  selection : getSelection(state.selection)
})

const MapDispatchToProps = dispatch => {
  return {
      onLoaded: () =>{
          dispatch(load())
      }
  }
}

export default connect(
  mapStateToProps,
  MapDispatchToProps
)(Selection)
