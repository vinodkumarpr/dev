import {FILTER_WORDS, CLEAR_FILTER, DISPLAY_WORD,
         DISPLAY_QUIZ, START_TIMER, QUIZ_LOAD, QUIZ_START,
         QUIZ_FINISH, QUIZ_START_QUESTION, QUIZ_ANSWERED_QUESTION, 
         QUIZ_COMPLETE_QUESTION, QUIZ_TIMER_START, QUIZ_TIMER_STOP} from '../constants/actiontypes'

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

export const loadQuiz  = (totalQuestions) => {
    return {
        type: QUIZ_LOAD,
        totalQuestions: totalQuestions
    }    
}

export const startQuiz  = (questions, duration) => {
    return {
        type : QUIZ_START,
        questions : questions,
        duration : duration
    }    
}

export const startQuestion  = (index, duration) => {
    return {
        type: QUIZ_START_QUESTION,
        index: index,
        duration: duration
    }    
}

export const answerQuestion  = (answer) => {
    return {
        type: QUIZ_ANSWERED_QUESTION,
        answer: answer
    }    
}

export const completeQuestion  = (index) => {
    return {
        type: QUIZ_COMPLETE_QUESTION,
        index: index
    }    
}

export const finishQuiz  = () => {
    return {
        type: QUIZ_FINISH,
        questions: questions
    }    
}

export const startQuizTimer = (token, duration) => {
    return {
        type: QUIZ_TIMER_START,
        token: token,
        duration: duration
    } 
}

export const stopQuizTimer = (token) => {
    return {
        type: QUIZ_TIMER_STOP,
        token: token,
    } 
}
