import { delay } from 'redux-saga';
import {put, takeEvery, all, call } from 'redux-saga/effects';
import { CLICK_ATTACK_MONSTER } from '../actionTypes/actionTypes';

export function* helloSaga() {
  console.log("Hello Sagas");
}

export function* attackAsync() {
  yield call(delay, 1000);
  yield put({type: CLICK_ATTACK_MONSTER})
}

export function* watchAttackAsync() {
  yield takeEvery('ATTACK_ASYNC', attackAsync)
}

// export function* fetchData(action) {
//   try {
//     const data = yield call(Api.fetchUser, action.payload.url);
//     yield put({type: "FETCH_SUCCEEDED", data })
//   } catch (error) {
//     yield put({type: "FETCH_FAILED", error})
//   }
// }
//
// function* watchdetchData() {
//   yield takeEvery('FETCH_REQUESTED', fetchData)
// }

export default function* rootSagas() {
  yield all([
    helloSaga(),
    watchAttackAsync(),
    //watchdetchData(),
  ])
}

