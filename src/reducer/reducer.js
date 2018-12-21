import { combineReducers } from "redux";
import * as ActionTypes from '../actionTypes/actionTypes';
const { createStore } = require('redux');

// TODO funskjon for å oppgrader helter hver 100 lvl
// TODO logge inne/registrere seg samt kunne lagre data
// TODO forbedre scaling av liv, pris på helter, clickdamage
// TODO funskjon/knapp for å kjøpe elemter type (mer bossTid, mindre bossLiv, mer %vis DPS på helter/lavere pris;
//


const initalState = {

  monsterMaxHealth: 10,
  monsterRemainingHealth: 10,
  monsterLevel: 1,
  isBoss: false,
  monsterDamage: 1,

  heroClickDamage: 1,
  heroCash: 1000,
  autoIncrease: true,
  clickUpgradePrice: 5,
  heroRemainingHealth: 100,
  heroMaxHealth: 100, //Hvor mye liv helten har
  heroDefence: 0, //prosent av skaden til monstre som forsvinner
  heroDPS: 0, //hvor mye skade auto-attacks gjør per sekund
  heroGreed: 0, //prosent av hvor mye av totalkostnaden på auto-attackers som forsvinner
  heroPatience: 0, //prosent av hvor mye tid av "cooldown" på angrep til auto-attackers som forsvinner

  heroes: [
    {
      autoName: "Steffen",
      autoPrice: 10,
      timesBought: 1,
      attack: 1,
      health: 1,
      greed: 1,
      defence: 0,
      patience: 0,

    },
    {
      autoName: "Emil",
      autoPrice: 50,
      timesBought: 1,
      attack: 5,
      defence: 0.2,
      patience: 1,
      health: 0,
      greed: 0,
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
        state.heroCash = state.heroCash - hero.autoPrice;
        state.heroDPS = state.heroDPS + hero.attack;
        state.heroDefence = state.heroDefence + hero.defence;
        state.heroPatience = state.heroPatience + hero.patience;
        state.heroGreed = state.heroGreed + hero.greed;
        state.heroMaxHealth = state.heroMaxHealth + hero.health;

        const nyAtt = hero.attack + hero.timesBought;
        console.log("state:", state);
        console.log("hero:", hero);
          return {
            ...state,
            timesBought: hero.timesBought + 1,
            autoName: hero.autoName,
            autoPrice: hero.autoPrice + hero.timesBought,
            attack: nyAtt,
            defence: hero.defence,
            health: hero.health,
            patience: hero.patience,
            greed: hero.greed,
          };
        }
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
    if(state.heroCash >= state.clickUpgradePrice) {
      return {
        ...state,
        heroClickDamage: state.heroClickDamage + 1,
        heroCash: state.heroCash - state.clickUpgradePrice,
        clickUpgradePrice: Math.round(state.clickUpgradePrice * 1.2),
      };
    }
    return {...state};
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

    const dmgTaken = (att, def) => {
      const dmgRes = (att / 100) * def;
      return att - dmgRes;
    };

    const monsterDMG = state.monsterDamage / 10;

    let attacked = (state.heroRemainingHealth - dmgTaken(monsterDMG, state.heroDefence));
    return {
      ...state,
      heroRemainingHealth: attacked,
    };
  }

  case ActionTypes.PREV_LEVEL: {
    return{
      ...state,
      isBoss:false,
      monsterLevel: state.monsterLevel - 1,
      monsterMaxHealth: state.monsterMaxHealth,
      monsterRemainingHealth: state.monsterMaxHealth,
    };
  }

  case ActionTypes.NEXT_LEVEL: {
    console.log("state.heroRemainingHealth > state.heroMaxHealth:", state.heroRemainingHealth + state.heroRemainingHealth + Math.round(state.monsterMaxHealth * 0.2) < state.heroMaxHealth);
    const test = state.heroRemainingHealth + state.heroRemainingHealth + Math.round(state.monsterMaxHealth * 0.2) > state.heroMaxHealth ? state.heroMaxHealth : state.heroRemainingHealth + Math.round(state.monsterMaxHealth * 0.2)

      return{
        ...state,
        monsterMaxHealth: state.monsterMaxHealth + newHealth,
        monsterRemainingHealth: state.monsterMaxHealth + newHealth,
        monsterLevel: state.monsterLevel + 1,
        heroRemainingHealth: test,
      };
  }

  case ActionTypes.MORE_MONEY: {
      const newBalance = Math.round(
        state.heroCash + (state.monsterMaxHealth * 0.01) + state.monsterLevel
      );
      return {
        ...state,
        heroCash: newBalance
    };
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
