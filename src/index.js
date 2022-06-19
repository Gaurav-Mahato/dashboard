import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {Provider} from "react-redux"
import {applyMiddleware} from "redux";
import {createStore} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import { BrowserRouter as Router } from "react-router-dom";
const initialState = {}
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'))

