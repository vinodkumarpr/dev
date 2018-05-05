import { connect } from 'react-redux'
import { setSelection } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.selection
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setSelection(ownProps.filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
