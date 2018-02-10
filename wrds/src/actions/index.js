import {FILTER_WORDS, CLEAR_FILTER, DISPLAY_WORD, DISPLAY_QUIZ} from '../constants/actiontypes'

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

export const displayQuiz = () => {
    return {
        type: DISPLAY_QUIZ
    }
}

export const displayWord = word => {
    return {
        type: DISPLAY_WORD,
        word: word
    }
}
