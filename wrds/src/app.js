import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import {render} from 'react-dom'
import {Provider} from "react-redux"
import wordsApp from './reducers'
import quizapi from './middleware/quizapi'
import quiztimerapi from './middleware/quiztimerapi'
import Application from './containers/Application'

let store = createStore(wordsApp, applyMiddleware(quizapi, quiztimerapi))

render(
    <Provider store={store}>
    <Application/>
    </Provider>
    , document.getElementById('react-application')
)