import test from 'tape';

import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { attackAsync } from './Sagas';

test('attackAsync click test', (assert) => {
  const gen = attackAsync();

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
  );

  assert.deepEqual(
    gen.next().value,
    put({type: "CLICK_ATTACK_MONSTER"}),
  );

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined }
  );

  assert.end()
});