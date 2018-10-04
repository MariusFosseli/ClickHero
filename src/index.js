import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer/reducer';
import rootSagas from './sagas/Sagas';

// const rootReducer = combineReducers({
//   list: reducer,
// });

function saveToLocalStorage(state) {
  try {
    const serilizedState  =JSON.stringify(state)
    localStorage.setItem('state', serilizedState)
  } catch (e) {
    console.log(e)
  }
}

function loadFromLocalStorage(){
  try {
    const serilizedState  = localStorage.getItem('state')
    if (serilizedState === null) return undefined
    return JSON.parse(serilizedState)
  } catch (e) {
    console.log(e)
    return undefined
  }
}

const persistedState = loadFromLocalStorage();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(sagaMiddleware)
);

store.subscribe(() => saveToLocalStorage(store.getState()));

sagaMiddleware.run(rootSagas);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();