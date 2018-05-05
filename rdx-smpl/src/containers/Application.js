import {connect} from 'react-redux'
import {launchMain, goBack} from '../actions'
import ApplicationComponent from '../components/Application.react'

const MapStateToProps = state => {
    return {
        title : "None"
    }
}

const Application = connect (
    MapStateToProps
) (ApplicationComponent)

export default Application;
