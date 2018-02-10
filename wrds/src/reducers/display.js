import { DISPLAY_WORD, DISPLAY_QUIZ } from '../constants/actiontypes'

const display = (state = {word : null, display : null}, action) => {
    switch (action.type) {
        case DISPLAY_WORD:
            return {
                word: action.word,
                type: "word"
            }
        case DISPLAY_QUIZ:
            return {
                word: null,
                type: "quiz"
            }
        default:
            return state;
    }
}

export default display