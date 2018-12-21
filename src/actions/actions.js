import * as ActionTypes from "../actionTypes/actionTypes";

export const clickAttackMonster = () => {
  return {
    type: ActionTypes.CLICK_ATTACK_MONSTER,
  };
};
export const increaseClickDamage = () => {
  return {
    type: ActionTypes.INCREASE_CLICK_DAMAGE,
  };
};

export const buyAutoAttacker = () => {
  return {
    type: ActionTypes.BUY_AUTO_ATTACKER,
  };
};

export const autoAttack = () => {
  return {
    type: ActionTypes.AUTO_ATTACK,
  };
};

export const monsterAttack = () => {
  return {
    type: ActionTypes.MONSTER_ATTACK,
  };
};

export const useAbility = () => {
  return {
    type: ActionTypes.USE_ABILITY,
  };
};

export const steffenAbility = () => {
  return {
    type: ActionTypes.STEFFEN_ABILITY,
  };
};

export const emilAbility = () => {
  return {
    type: ActionTypes.EMIL_ABILITY,
  };
};


