import * as ActionTypes from '../actionTypes/actionTypes';
const { createStore } = require('redux');

const initalState = {

  monsterName: "Monster",
  healthMax: 10,
  healthRemain: 10,
  monsterLevel: 1,

  heroName: "Hero",
  heroClickDamage: 1,
  heroDPS: 1,
  heroCash: 10,

  clickUpgradePrice: 5,

  heroes: [
    {
      autoName: "Benjamin",
      autoPrice: 10,
      autoDPS: 2,
      timesBought: 0,
    },
    {
      autoName: "Torleif",
      autoPrice: 50,
      autoDPS: 10,
      timesBought: 0,
    },
    {
      autoName: "Conrad",
      autoPrice: 150,
      autoDPS: 25,
      timesBought: 0,
    }
  ]
};

export default function allActions(state=initalState, action) {
  switch (action.type) {

  case  ActionTypes.CLICK_ATTACK_MONSTER: {
      if(state.healthRemain < 1) {
        const newLevel = state.monsterLevel+1;
        console.log("Killed");
        return {
          ...state,
          healthMax: Math.round(state.healthMax * 1.1),
          healthRemain: Math.round(state.healthMax * 1.1),
          monsterLevel: newLevel,
          heroCash: state.heroCash + state.monsterLevel,
        };
      } else {
        console.log("Attacked");
        return {
          ...state,
          healthRemain: state.healthRemain - state.heroClickDamage
        };
      }
  }

  case ActionTypes.INCREASE_CLICK_DAMAGE: {
    if (state.heroCash >= state.clickUpgradePrice) {
      console.log("Bought");
      return {
        ...state,
        heroClickDamage: state.heroClickDamage + 1,
        heroCash: state.heroCash - state.clickUpgradePrice,
        clickUpgradePrice: Math.round(state.clickUpgradePrice * 1.2),
      };
    } else {
      console.log("Not enough cash");
      return {
        ...state,
      };
    }
  }

  case  ActionTypes.BUY_AUTO_ATTACKER: {
    const updateHeroesList = state.heroes.map((hero, index) => {
      if ((index === action.index) && state.heroCash >= hero.autoPrice) {
        console.log((hero.autoName) + " bought");
        state.heroDPS = state.heroDPS + hero.autoDPS;
        state.heroCash = state.heroCash - hero.autoPrice;

        const newPrice = Math.round(hero.autoPrice * 1.5);
        const newNextDPS = Math.round(hero.autoDPS * 1.25);
        return {
          ...hero,
          ...state,
          timesBought: hero.timesBought + 1,
          heroDPS: 10,
          autoDPS: newNextDPS,
          autoPrice: newPrice,
        };
      }
      console.log("Not enough cash");
      return hero;
    });

    return {
      ...state,
      heroes: updateHeroesList
    };
  }

  case ActionTypes.AUTO_ATTACK: {
    console.log("Auto attacked");
    const newHealth = state.healthRemain - state.heroDPS;
    console.log("  ", +newHealth);
    return {
      ...state,
      healthRemain: newHealth,
    };
  }

  case ActionTypes.NEXT_LEVEL: {
    console.log("level " + state.monsterLevel + " completed");
    const newBalance = Math.round(state.heroCash + (state.monsterLevel * 1.5));
    return {
      ...state,
      healthMax: Math.round(state.healthMax * 1.1),
      healthRemain: Math.round(state.healthMax * 1.1),
      heroCash: newBalance,
      monsterLevel: state.monsterLevel + 1,
    };

  }

  default:
    return state;
  }
}
