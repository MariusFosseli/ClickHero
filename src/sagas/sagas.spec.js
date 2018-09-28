import test from 'tape';

import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import * as SF from './Sagas';

test('attackAsync click test', (assert) => {
  const gen = SF.attackAsync();

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    console.log(gen),
  );

  assert.deepEqual(
    gen.next().value,
    put({type: "CLICK_ATTACK_MONSTER"}),
    console.log(gen.value),
  );

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
  console.log(gen.value),
  );

  assert.end()
});

  test('buyClickAsync test', (assert) => {
    const gen = SF.buyClickAsync();

    assert.deepEqual(
      gen.next().value,
      call(delay, 3000),
    console.log(gen),
    );

    assert.deepEqual(
      gen.next().value,
      put({type: 'INCREASE_CLICK_DAMAGE'}),
    console.log(gen),
    );

    assert.deepEqual(
      gen.next(),
      { done: true, value: undefined },
      console.log(gen),
    );

  assert.end()
});