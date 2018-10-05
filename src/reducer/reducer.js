import * as ActionTypes from '../actionTypes/actionTypes';
const { createStore } = require('redux');

// TODO funskjon for å oppgrader helter hver 100 lvl
// TODO logge inne/registrere seg samt kunne lagre data
// TODO forbedre scaling av liv, pris på helter, clickdamage
// TODO funskjon/knapp for å kjøpe elemter type (mer bossTid, mindre bossLiv, mer %vis DPS på helter/lavere pris;


const initalState = {

  monsterName: "Monster",
  healthMax: 10,
  healthRemain: 10,
  bossLife: 10,
  monsterLevel: 1,
  initTime: 30,
  bossTimer: 0,
  isBoss: false,

  heroName: '',
  heroClickDamage: 1,
  heroDPS: 10,
  heroCash: 0,
  autoIncrease: true,
  clickUpgradePrice: 5,
  isLoggedIn: false,

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
  let newHealth = Math.round(Math.pow(state.monsterLevel, 2.3) - (state.monsterLevel * 5));
  if(newHealth < 10) {
    newHealth = 10;
  }
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

        const newPrice = Math.round(hero.statePrice * Math.pow(hero.timesBought, 1.1));
        const newNextDPS = Math.round((hero.stateDPS * 0.3) + hero.timesBought);

        if(hero.timesBought % 10 === 9) {
          return {
            ...hero,
            ...state,
            timesBought: hero.timesBought + 1,
            heroName: hero.heroName,
            autoDPS: (hero.autoDPS * 2),
            autoPrice: hero.autoPrice + newPrice,
            statePrice: hero.statePrice,
            stateDPS: hero.stateDPS,
          };
        } else {
          return {
            ...state,
            timesBought: hero.timesBought + 1,
            heroName: hero.heroName,
            autoDPS: hero.autoDPS + newNextDPS,
            autoPrice: hero.autoPrice + newPrice,
            statePrice: hero.statePrice,
            stateDPS: hero.stateDPS,
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
    let damage = state.heroDPS / 10;
    let attack = (state.healthRemain - damage);
    return {
      ...state,
      healthRemain: attack,
    };
  }

  case ActionTypes.BOSS_FIGHT: {
    let time = (state.bossTimer - 0.1);
    return {
      ...state,
      bossTimer: time,
    };
  }

  case ActionTypes.PREV_LEVEL: {
    console.log("state.healthMax:   " + state.healthMax);
    return{
      ...state,
      isBoss:false,
      monsterLevel: state.monsterLevel - 1,
      healthMax: state.healthMax,
      healthRemain: state.healthMax,
    };
  }

  case ActionTypes.NEXT_LEVEL: {
    let bossLevel = state.monsterLevel%10;
    let bossHealth = (state.healthMax * 2);
    if(bossLevel === 9) {

      console.log("monster life: " + state.healthMax + "   --    boss life: " + (state.healthMax * 2) + "   --   at level: " + state.monsterLevel);
      state.isBoss = true;
      return{
        ...state,
        bossTimer: state.initTime,
        bossLife: bossHealth,
        healthRemain: bossHealth,
        monsterLevel: state.monsterLevel + 1,
      };
    } else if (bossLevel === 0) {
      state.bossLife = 0;
      const afterBoss = Math.round(newHealth * 2);
      console.log("newHealth : " + newHealth  + " -- newHealth * 2 : " + afterBoss);
      state.isBoss = false;
      return{
        ...state,
        healthMax: state.healthMax + newHealth,
        healthRemain: state.healthMax + newHealth,
        monsterLevel: state.monsterLevel + 1,
      };
    }
    else {
      console.log("state.healthMax:   " + state.healthMax + "   --   newHealth" + newHealth);
      state.isBoss = false;
      return{
        ...state,
        healthMax: state.healthMax + newHealth,
        healthRemain: state.healthMax + newHealth,
        monsterLevel: state.monsterLevel + 1,
      };
    }
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
        state.heroCash + (state.healthMax * 0.01) + state.monsterLevel
      );
      console.log("New balace: " + newBalance);
      console.log("Gold gaiend from monster: " + Math.round((state.healthMax * 0.01) + state.monsterLevel));
      return {
        ...state,
        heroCash: newBalance
      }
    }
  }

  case ActionTypes.SAME_LEVEL: {
    return {
      ...state,
      healthMax: state.healthMax,
      healthRemain: state.healthMax,
    };
  }

  case ActionTypes.TOGGLE_AUTO_INCREASE: {
    console.log("Status is : " + state.autoIncrease);
    return {
      ...state,
      autoIncrease: !state.autoIncrease,
    };
  }

  case ActionTypes.ADD_PLAYER: {
    return {
      heroName: action.name,
      isLoggedIn: !state.isLoggedIn,
    };
  }


  default:
    return state;
  }
}

// export default combineReducers({
//     allActions,
//   }
// )
