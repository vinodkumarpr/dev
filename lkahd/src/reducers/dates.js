import { SET_START_DATE, SET_END_DATE } from '../constants/actiontypes'
var moment = require('moment');

const dates = (state = { startDate: moment(), endDate: moment() }, action) => {
    switch (action.type) {
        case SET_START_DATE:
            return Object.assign({}, state, {
                startDate: action.startDate
            });
        case SET_END_DATE:
            return Object.assign({}, state, {
                endDate: action.endDate
            });

        default:
            return state;
    }
}

export default dates
