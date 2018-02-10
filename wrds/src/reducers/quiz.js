import { QUIZ_START, QUIZ_START_QUESTION, QUIZ_TIMER_TICK, 
    QUIZ_COMPLETE_QUESTION, QUIZ_FINISH } from '../constants/actiontypes'

const quiz = (state = {}, action) => {
    switch (action.type) {
        case QUIZ_START:
            return Object.assign({}, state, {
                questions : action.questions,
                index: -1,
                totalQuestions : action.questions.length,
                elaspedtime : 0,
                duration: action.duration,
                quizstate: "started",
            });
        case QUIZ_START_QUESTION:
        console.log("quiz " + QUIZ_START_QUESTION);
            return Object.assign({}, state, {
                index: action.index,
                elaspedtime : 0,
                questionstate: "started"
            });
        case QUIZ_TIMER_TICK:
            return Object.assign({}, state, {
                elaspedtime: action.elaspedtime
            });
        case QUIZ_COMPLETE_QUESTION:
            return Object.assign({}, state, {
                index: action.index,
                questionstate: "finished"
            });
        case QUIZ_FINISH:
            return Object.assign({}, state, {
                quizstate: "finished",
            });
        default:
            return state;
    }
}

export default quiz