import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import {render} from 'react-dom'
import {Provider} from "react-redux"
import appReducer from './reducers'
import api from './middleware/api'
import Application from './containers/Application'

let store = createStore(appReducer, applyMiddleware(api))

render(
    <Provider store={store}>
    <Application/>
    </Provider>
    , document.getElementById('react-application')
)