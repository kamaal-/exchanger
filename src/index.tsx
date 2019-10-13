import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './services/reducers'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from './services/epics/'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
declare var module: any // issue https://github.com/vitaliy-bobrov/angular-hot-loader/issues/5

const epicMiddleware = createEpicMiddleware()
const middlewares = [thunk, epicMiddleware];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const store = createStore(rootReducer,applyMiddleware(...middlewares));
epicMiddleware.run(rootEpic)
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        ReactDOM.render(
            <Provider store={store}><NextApp /></Provider>,
            document.getElementById('root')
        )
    })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
