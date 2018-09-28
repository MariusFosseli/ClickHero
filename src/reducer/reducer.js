import * as ActionTypes from '../actionTypes/actionTypes';
const { createStore } = require('redux');

const initalState = {

  monsterName: "Monster",
  healthMax: 10,
  healthRemain: 10,
  bossLife: 10,
  monsterLevel: 1,

  heroName: "Hero",
  heroClickDamage: 1,
  heroDPS: 0,
  heroCash: 750000000000000,

  clickUpgradePrice: 5,

  heroes: [
    {
      autoName: "Benjamin",
      autoPrice: 10,
      statePrice: 10,
      autoDPS: 1,
      stateDPS: 1,
      timesBought: 1,
    },
    {
      autoName: "Torleif",
      autoPrice: 50,
      statePrice: 50,
      autoDPS: 10,
      stateDPS: 10,
      timesBought: 1,
    },
    {
      autoName: "Conrad",
      autoPrice: 150,
      statePrice: 150,
      autoDPS: 30,
      stateDPS: 30,
      timesBought: 1,
    },
    {
      autoName: "Harald",
      autoPrice: 750,
      statePrice: 750,
      autoDPS: 125,
      stateDPS: 125,
      timesBought: 1,
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

        const newPrice = Math.round((hero.autoPrice + hero.statePrice) * 1.5);
        const newNextDPS = Math.round((hero.autoDPS + hero.stateDPS) * 1.1);

        if(hero.timesBought % 10 === 9) {
          console.log("Level ends with 0");
          return {
            ...hero,
            ...state,
            timesBought: hero.timesBought + 1,
            autoDPS: (newNextDPS * 2),
            autoPrice: newPrice,
          };
        } else {
          console.log("OTHER LEVEL");
          return {
            ...hero,
            ...state,
            timesBought: hero.timesBought + 1,
            autoDPS: newNextDPS,
            autoPrice: newPrice,
          };
        }
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
    const newHealth = (state.healthRemain - state.heroDPS);
    console.log("  ", +newHealth);
    return {
      ...state,
      healthRemain: newHealth
    };
  }

  case ActionTypes.NEXT_LEVEL: {
    if(state.monsterLevel % 10 === 9) {
      console.log("BOSS LEVEL");
      const newBalance = Math.round(state.heroCash + ((state.monsterLevel * 1.5) * 10));
      console.log("level " + state.monsterLevel + " completed --------------------" + ((state.monsterLevel * 1.5) * 10) + " gold gained");
      const health = Math.round(state.healthMax * state.monsterLevel);
      return {
        ...state,
        bossLife: health,
        healthRemain: health,
        heroCash: newBalance,
        monsterLevel: state.monsterLevel + 1,
      };
    } else {
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
  }

  default:
    return state;
  }
}
