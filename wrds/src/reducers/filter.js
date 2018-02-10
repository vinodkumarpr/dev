import {FILTER_WORDS, CLEAR_FILTER} from '../constants/actiontypes'

const filter = (state = null, action) => {
    switch (action.type) {
        case FILTER_WORDS:
            return action.filter;
        case CLEAR_FILTER:
            return null;
        default:
            return state;
    }
}

export default filter