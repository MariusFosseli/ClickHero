import { delay } from 'redux-saga';
import {put, takeEvery, all, call, takeLatest } from 'redux-saga/effects';
import  * as AT  from '../actionTypes/actionTypes';

export function* helloSaga() {
  console.log("Hello Sagas");
}

//Async functions

export function* attackAsync() {
  yield call(delay, 1000);
  yield put({type: AT.CLICK_ATTACK_MONSTER})
}

export function* buyAutoAsync() {
  yield call(delay, 3000);
  yield put({type: AT.BUY_AUTO_ATTACKER })
}

export function* buyClickAsync() {
  yield call(delay, 3000);
  yield put({type: AT.INCREASE_CLICK_DAMAGE })
}

//Watch functions

export function* watchAttackAsync() {
  yield takeEvery('ATTACK_ASYNC', attackAsync)
}

export function* watchBuyAutoSync(){
  yield takeLatest('BUY_AUTO_ASYNC', buyAutoAsync)
}

export function* watchbuyClickAsync(){
  yield takeLatest('INCREASE_CLICK_DAMAGE_ASYNC', buyClickAsync)
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
    watchBuyAutoSync(),
    watchbuyClickAsync(),
    //watchdetchData(),
  ])
}

