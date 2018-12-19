import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer/reducer';

const rootReducer = combineReducers({
    allActions: reducer
  }
);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();