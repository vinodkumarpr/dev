import {connect} from 'react-redux'
import MonthComponent from '../components/Month'
import {showPlaylistPopup, closePlaylistPopup} from '../actions'

const MapStateToProps = (state, ownProps) => {
    return {
        startDate : state.dates.startDate,
        endDate : state.dates.endDate,
        playlists : state.playlists ? state.playlists.playlists : null,
        selectedDate : state.playlists.selectedDate,
        showPlaylistPopup : state.playlists ? state.playlists.showPlaylistPopup : false
    }
}

const MapDispatchToProps = dispatch => {
    return {
        onClick: (date) =>{
            dispatch(showPlaylistPopup(date))
        },
        onClosePlaylist: () => {
            dispatch(closePlaylistPopup(false))
        }
    }
  }

const Month = connect (
    MapStateToProps,
    MapDispatchToProps
) (MonthComponent)

export default Month;
