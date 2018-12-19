import { combineReducers } from "redux";
import * as ActionTypes from '../actionTypes/actionTypes';
const { createStore } = require('redux');

// TODO funskjon for å oppgrader helter hver 100 lvl
// TODO logge inne/registrere seg samt kunne lagre data
// TODO forbedre scaling av liv, pris på helter, clickdamage
// TODO funskjon/knapp for å kjøpe elemter type (mer bossTid, mindre bossLiv, mer %vis DPS på helter/lavere pris;


const initalState = {

  monsterMaxHealth: 10,
  monsterRemainingHealth: 10,
  monsterLevel: 1,
  isBoss: false,
  monsterDamage: 1,

  heroClickDamage: 1,
  heroDPS: 2,
  heroCash: 1000,
  autoIncrease: true,
  clickUpgradePrice: 5,
  isLoggedIn: false,
  heroMaxHealth: 100,
  heroRemainingHealth: 100,
  heroDefence: 0,

  heroes: [
    {
      autoName: "Steffen",
      autoPrice: 10,
      statePrice: 10,
      autoDPS: 1,
      stateDPS: 1,
      timesBought: 1,
      health: 1,
    },
    {
      autoName: "Emil",
      autoPrice: 50,
      statePrice: 50,
      autoDPS: 10,
      stateDPS: 10,
      timesBought: 1,
      defence: 3,
    },
  ]
};

export default function allActions(state=initalState, action) {
  let newHealth = Math.round(Math.pow(state.monsterLevel, 2.3) - (state.monsterLevel * 5));
  if(newHealth < 10) {
    newHealth = 10;
  }
  switch (action.type) {

  case  ActionTypes.BUY_AUTO_ATTACKER: {
    const updateHeroesList = state.heroes.map((hero, index) => {
      if ((index === action.index) && state.heroCash >= hero.autoPrice) {
        console.log((hero.autoName) + " bought");
        state.heroDPS = state.heroDPS + hero.autoDPS;
        state.heroCash = state.heroCash - hero.autoPrice;
        state.heroDefence = state.heroDefence + hero.defence;

        const newPrice = Math.round(hero.statePrice * Math.pow(hero.timesBought, 1.1));
        const newNextDPS = Math.round((hero.stateDPS * 0.3) + hero.timesBought);
          return {
            ...state,
            timesBought: hero.timesBought + 1,
            heroName: hero.heroName,
            autoDPS: hero.autoDPS + newNextDPS,
            autoPrice: hero.autoPrice + newPrice,
            statePrice: hero.statePrice,
            stateDPS: hero.stateDPS,
            defence: hero.defence,
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

  case  ActionTypes.CLICK_ATTACK_MONSTER: {
    return {
      ...state,
      monsterRemainingHealth: state.monsterRemainingHealth - state.heroClickDamage
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


  case ActionTypes.AUTO_ATTACK: {
    let damage = state.heroDPS / 10;
    let attack = (state.monsterRemainingHealth - damage);
    return {
      ...state,
      monsterRemainingHealth: attack,
    };
  }

  case ActionTypes.MONSTER_ATTACK: {
    let damage = state.monsterDamage / 10;
    let attack = (state.heroRemainingHealth - damage);
    return {
      ...state,
      heroRemainingHealth: attack,
    };
  }

  case ActionTypes.PREV_LEVEL: {
    console.log("state.monsterMaxHealth:   " + state.monsterMaxHealth);
    return{
      ...state,
      isBoss:false,
      monsterLevel: state.monsterLevel - 1,
      monsterMaxHealth: state.monsterMaxHealth,
      monsterRemainingHealth: state.monsterMaxHealth,
    };
  }

  case ActionTypes.NEXT_LEVEL: {
    console.log("state.monsterMaxHealth:   " + state.monsterMaxHealth + "   --   newHealth" + newHealth);

      return{
        ...state,
        monsterMaxHealth: state.monsterMaxHealth + newHealth,
        monsterRemainingHealth: state.monsterMaxHealth + newHealth,
        monsterLevel: state.monsterLevel + 1,
        heroRemainingHealth: state.heroRemainingHealth + Math.round(state.monsterMaxHealth * 0.2),
      };
  }

  case ActionTypes.MORE_MONEY: {
    let bossLevel = state.monsterLevel%10;
    if(bossLevel === 0) {
      const newBalance = Math.round(
        state.heroCash + (state.bossLife * 0.1)
      );
      console.log("New balace: " + newBalance);
      console.log("Gold gaiend from boss: " + Math.round(state.bossLife * 0.1));
      return{
        ...state,
        heroCash: newBalance,
      };
    } else {
      const newBalance = Math.round(
        state.heroCash + (state.monsterMaxHealth * 0.01) + state.monsterLevel
      );
      console.log("New balace: " + newBalance);
      console.log("Gold gaiend from monster: " + Math.round((state.monsterMaxHealth * 0.01) + state.monsterLevel));
      return {
        ...state,
        heroCash: newBalance
      }
    }
  }

  case ActionTypes.SAME_LEVEL: {
    return {
      ...state,
      monsterMaxHealth: state.monsterMaxHealth,
      monsterRemainingHealth: state.monsterMaxHealth,
    };
  }

  case ActionTypes.TOGGLE_AUTO_INCREASE: {
    console.log("Status is : " + state.autoIncrease);
    return {
      ...state,
      autoIncrease: !state.autoIncrease,
    };
  }

  case ActionTypes.STEFFEN_ABILITY: {
    const { steffen } = state;
  }

  case ActionTypes.EMIL_ABILITY: {

  }


  default:
    return state;
  }
}

// export default combineReducers({
//     allActions,
//     aristocats
//   }
// );
