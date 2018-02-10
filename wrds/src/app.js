import React from 'react'
import { createStore } from 'redux';
import {render} from 'react-dom';
import {Provider} from "react-redux";
import wordsApp from './reducers';
import DisplayWordList from './containers/DisplayWordList'

let store = createStore(wordsApp)

render(
    <Provider store={store}>
    <DisplayWordList/>
    </Provider>
    , document.getElementById('react-application')
)