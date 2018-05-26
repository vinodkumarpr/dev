import { connect } from 'react-redux'
import PlaylistComponent from '../components/Playlist'

const mapStateToProps = (state, ownProps) => ({
  show : ownProps.show,
  onClose : ownProps.onClose,
  date : ownProps.date,
  playlists : state.playlists
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setSelection(ownProps.selection))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistComponent)

