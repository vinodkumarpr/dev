import {connect} from 'react-redux'
import MonthComponent from '../components/Month'

const MapStateToProps = (state, ownProps) => {
    return {
        startDate : state.dates.startDate,
        endDate : state.dates.endDate,
        playlists : state.playlists ? state.playlists.playlists : null
    }
}

const Month = connect (
    MapStateToProps
) (MonthComponent)

export default Month;
