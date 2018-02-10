import {connect} from 'react-redux'
import {displayQuiz, displayWord} from '../actions'
import ApplicationComponent from '../components/Application.react'

const MapStateToProps = state => {
    console.log("MapStateToProps " + state)
    return {
        display : state.display
    }
}

/*
const MapDispatchToProps = dispatch => {
    return {
        onDisplayQuiz: () => {
            dispatch(displayQuiz())
        },
        onDisplayWord: word => {
            dispatch(displayWord(word))
        }
    }
}
*/

const Application = connect (
    MapStateToProps
) (ApplicationComponent)

export default Application;
