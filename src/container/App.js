import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Monster from '../components/Monster';
import Hero from '../components/Hero';

class App extends Component {

  bossFight() {
    if(this.props.isBoss === true) {
      if(this.props.bossTimer < 0) {
        this.props.prevLevel();
        this.props.toggleAutoIncrease();
      }
      this.props.bossFight();
    }
  }

  asd() {
    if(this.props.monsterRemainingHealth < 1){
      console.log("New level: ---------------------------------------------------------------");
      this.props.moreMoney();
      if(this.props.autoIncrease === false) {
        this.props.sameLevel();
      } else {
        this.props.nextLevel();
        console.log("Level " + (this.props.monsterLevel - 1) + " completed!");
      }
    }
  }

  tick(){
    this.bossFight();
    this.props.autoAttack();
    this.props.monsterAttack();
    this.asd();
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 100);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {

    const boss = this.props.isBoss;

    return (
      <div>
        <Hero
          heroName={this.props.heroName}
          heroClickDamage={this.props.heroClickDamage}
          heroRemainingHealth={this.props.heroRemainingHealth}
          heroDPS={this.props.heroDPS}
          heroDefence={this.props.heroDefence}
          heroCash={this.props.heroCash}
          increaseClickDamage={this.props.increaseClickDamage}
          clickUpgradePrice={this.props.clickUpgradePrice}
          buyAutoAttacker={this.props.buyAutoAttacker}
          heroes={this.props.heroes}
          toggleAutoIncrease={this.props.toggleAutoIncrease}
          autoIncrease={this.props.autoIncrease}
        />

        <Monster
          monsterMaxHealth={this.props.monsterMaxHealth}
          monsterRemainingHealth={this.props.monsterRemainingHealth}
          monsterLevel={this.props.monsterLevel}
          clickAttackMonster={this.props.clickAttackMonster}
          isBoss={boss}
          bossTimer={this.props.bossTimer}
          bossLife={this.props.bossLife}
          monsterDamage={this.props.monsterDamage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //Hero
    heroClickDamage: state.heroClickDamage,
    heroRemainingHealth: state.heroRemainingHealth,
    heroDPS: state.heroDPS,
    heroCash: state.heroCash,
    heroDefence: state.heroDefence,
    clickUpgradePrice: state.clickUpgradePrice,
    autoIncrease: state.autoIncrease,
    isLoggedIn: state.isLoggedIn,
    //Monster
    monsterMaxHealth: state.monsterMaxHealth,
    monsterRemainingHealth: state.monsterRemainingHealth,
    monsterLevel: state.monsterLevel,
    isBoss: state.isBoss,
    bossLife: state.bossLife,
    monsterDamage: state.monsterDamage,
    //Auto Attackers
    heroes: state.heroes,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickAttackMonster: () => dispatch({ type: "CLICK_ATTACK_MONSTER" }),
    increaseClickDamage: () => dispatch({type: "INCREASE_CLICK_DAMAGE"}),
    buyAutoAttacker: (index) => dispatch({type: "BUY_AUTO_ATTACKER", index: index}),
    autoAttack: () => dispatch({type: "AUTO_ATTACK"}),
    monsterAttack: () => dispatch({type: "MONSTER_ATTACK"}),
    nextLevel: () => dispatch({type: "NEXT_LEVEL"}),
    bossFight: () => dispatch({type: "BOSS_FIGHT"}),
    prevLevel: () => dispatch({type: "PREV_LEVEL"}),
    moreMoney: () => dispatch({type: "MORE_MONEY"}),
    toggleAutoIncrease: () => dispatch({type: "TOGGLE_AUTO_INCREASE"}),
    sameLevel: () => dispatch({type: "SAME_LEVEL"}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
