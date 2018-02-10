import {FILTER_WORDS, CLEAR_FILTER} from '../constants/actiontypes'

export const filterWords = filter => {
    return {
        type: FILTER_WORDS,
        filter: filter
    }
}

export const clearFilter = () => {
    return {
        type: CLEAR_FILTER
    }
}