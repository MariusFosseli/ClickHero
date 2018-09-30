import * as ActionTypes from '../actionTypes/actionTypes';
const { createStore } = require('redux');

const initalState = {

  monsterName: "Monster",
  healthMax: 10,
  healthRemain: 10,
  bossLife: 10,
  monsterLevel: 1,
  initTime: 30,
  bossTimer: 0,
  isBoss: false,

  heroName: "Hero",
  heroClickDamage: 1,
  heroDPS: 0,
  heroCash: 2000,

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
  const newHealth = Math.round(10 + Math.pow(state.monsterLevel, 1.7));
  switch (action.type) {

  case  ActionTypes.CLICK_ATTACK_MONSTER: {
        return {
          ...state,
          healthRemain: state.healthRemain - state.heroClickDamage
        };
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

        const newPrice = Math.round(hero.autoPrice * 0.3);
        const newNextDPS = Math.round(hero.autoDPS + (hero.autoDPS * 0.1) + 0.5);

        if(hero.timesBought % 10 === 9) {
          return {
            ...hero,
            ...state,
            timesBought: hero.timesBought + 1,
            autoDPS: (hero.autoDPS * 2),
            autoPrice: hero.autoPrice + newPrice,
          };
        } else {
          return {
            ...state,
            timesBought: hero.timesBought + 1,
            autoDPS: newNextDPS,
            autoPrice: hero.autoPrice + newPrice,
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
    return {
      ...state,
      healthRemain: (state.healthRemain - state.heroDPS)
    };
  }

  case ActionTypes.BOSS_FIGHT: {
      return {
        ...state,
        bossTimer: state.bossTimer - 1,
      };
    }

  case ActionTypes.PREV_LEVEL: {
    return{
    ...state,
    isBoss:false,
    monsterLevel: state.monsterLevel - 1,
    healthMax: newHealth - state.monsterLevel * 1.7,
    healthRemain: newHealth,
};
  }

  case ActionTypes.NEXT_LEVEL: {
    let bossLevel = state.monsterLevel%10;
    if(bossLevel === 9) {
      state.isBoss = true;
    return{
      ...state,
      bossTimer: state.initTime,
      healthMax: newHealth,
      healthRemain: newHealth * 10,
      monsterLevel: state.monsterLevel + 1,
    };
  } else {
    state.isBoss = false;
      return{
      ...state,
      healthMax: newHealth,
      healthRemain: newHealth,
      monsterLevel: state.monsterLevel + 1,
  };
}
}

case ActionTypes.MORE_MONEY: {
  const newBalance = Math.round(state.heroCash +
    (state.healthMax * 0.1)
  );
  console.log("New balace: " + newBalance);
  console.log("Gold gaiend: " + Math.round(state.healthMax * 0.1));
  return{
    ...state,
    heroCash: newBalance,
  }
}

// FUNCTION NEXT LEVEL,
// run on app.tick() function after health is 0

// FUNCTION AUTO ATTACK,
// should only take heros DPS - monster health

// FUNCTION BUY AUTO ATTACKER,
// should increase the price and next dps value
// also increase the value for heros dps

// FUNCTION UPGRADE AUTO ATTACKER
// should reset to the auto attackers stats,
// but increase the % for dps increase

//FUNCTION FOR BOSS?
//should take timer as param

  default:
    return state;
  }
}
