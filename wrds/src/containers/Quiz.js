import {connect} from 'react-redux'
import { loadQuiz, answerQuestion } from '../actions'
import QuizComponent from '../components/Quiz.react'

const MapStateToProps = state => {
    return {
        question : (state.quiz.questions && state.quiz.index > -1) ? state.quiz.questions[state.quiz.index] : null,
        elaspedtime : state.quiz.elaspedtime,
        remainingtime : state.quiz.duration - state.quiz.elaspedtime,
        answer : state.quiz.answers ? state.quiz.answers[state.quiz.index] : null,
        correctanswer: state.quiz.questions ? state.quiz.questions[state.quiz.index].answer.correctanswer : null,
    }
}

const MapDispatchToProps = dispatch => {
    return {
        onAnswerQuestion: answer => {
            dispatch(answerQuestion(answer))
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
