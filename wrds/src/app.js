import React from 'react'
import { createStore } from 'redux';
import {render} from 'react-dom';
import {Provider} from "react-redux";
import wordsApp from './reducers';
import Application from './containers/Application'

let store = createStore(wordsApp)

render(
    <Provider store={store}>
    <Application/>
    </Provider>
    , document.getElementById('react-application')
)