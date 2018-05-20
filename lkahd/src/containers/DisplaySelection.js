import { connect } from 'react-redux'
import Selection from '../components/Selection'
import { Selections } from '../constants/constants'
import {load, setStartDate, setEndDate, show} from '../actions'

const getSelection = (selection) => {
  switch (selection) {
    case Selections.SELECT_ALL:
      return "All"
    case Selections.SELECT_COMPLETED:
      return "Completed"
    case Selections.SELECT_ACTIVE:
      return "Active"
    default:
      throw new Error('Unknown selection: ' + selection)
  }
}

const mapStateToProps = state => ({
  selection : getSelection(state.selection),
  startDate : state.dates.startDate,
  endDate : state.dates.endDate
})

const MapDispatchToProps = dispatch => {
  return {
      onLoaded: () =>{
          dispatch(load())
      },
      onSetStartDate: (date) => {
        dispatch(setStartDate(date))
      },
      onSetEndDate: (date) => {
        dispatch(setEndDate(date))
      },
      onClick: () => dispatch(show())
  }
}

export default connect(
  mapStateToProps,
  MapDispatchToProps
)(Selection)
