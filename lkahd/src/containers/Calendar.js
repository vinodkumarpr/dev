import {connect} from 'react-redux'
import CalendarComponent from '../components/Calendar'

const MapStateToProps = state => {
    return {
        startDate : state.dates.startDate,
        endDate : state.dates.endDate
    }
}

const Calendar = connect (
    MapStateToProps
) (CalendarComponent)

export default Calendar;
