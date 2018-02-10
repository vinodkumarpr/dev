import {connect} from 'react-redux'
import { loadQuiz, answerQuestion } from '../actions'
import QuizComponent from '../components/Quiz.react'

const MapStateToProps = state => {
    //console.log("Quiz :: MapStateToProps " + state)
    return {
        question : (state.quiz.questions && state.quiz.index > -1) ? state.quiz.questions[state.quiz.index] : null,
        elaspedtime : state.quiz.elaspedtime,
        remainingtime : state.quiz.duration - state.quiz.elaspedtime
    }
}

const MapDispatchToProps = dispatch => {
    return {
        onAnswerQuestion: index => {
            dispatch(answerQuestion(index))
        },
        onQuizLoaded: () =>{
            dispatch(loadQuiz(50))
        }
    }
}

const Quiz = connect (
    MapStateToProps,
    MapDispatchToProps
) (QuizComponent)

export default Quiz;
