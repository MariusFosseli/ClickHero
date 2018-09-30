import React, { Component, PropTypes } from 'react';

import Monster from '../components/Monster';
import Hero from '../components/Hero';
import AutoAttackers from '../components/AutoAttackers';
import { connect } from 'react-redux';

class App extends Component {

  bossFight() {
    if(this.props.isBoss === true) {
    if(this.props.bossTimer < 1) {
    this.props.prevLevel();
    }
      this.props.bossFight();
  }
}

asd() {
  if(this.props.healthRemain < 1){
    this.props.nextLevel();
    this.props.moreMoney();
  }
}

  tick(){
    this.bossFight();
    this.props.autoAttack();
    this.asd();
}

  // tick() {
  //   this.props.autoAttack();
  // }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    const boss = this.props.isBoss;

    // const AutoAttackerComponent = this.props.heroes.map((hero, index) => (
    //   <AutoAttackers
    //     key={index}
    //     index={index}
    //     autoName={hero.autoName}
    //     autoPrice={hero.autoPrice}
    //     autoDPS={hero.autoDPS}
    //     timesBought={hero.timesBought}
    //     buyAutoAttacker={this.props.buyAutoAttacker}
    //     buyAutoAsync={this.props.buyAutoAsync}
    //   />
    // ));


    return (
      <div>
        <Hero
          heroName={this.props.heroName}
          heroClickDamage={this.props.heroClickDamage}
          heroDPS={this.props.heroDPS}
          heroCash={this.props.heroCash}
          increaseClickDamage={this.props.increaseClickDamage}
          clickUpgradePrice={this.props.clickUpgradePrice}
          buyClickAsync={this.props.buyClickAsync}
          buyAutoAttacker={this.props.buyAutoAttacker}
          heroes={this.props.heroes}
        />

        <Monster
        monsterName={this.props.monsterName}
        healthMax={this.props.healthMax}
        healthRemain={this.props.healthRemain}
        monsterLevel={this.props.monsterLevel}
        clickAttackMonster={this.props.clickAttackMonster}
        attackAsync={this.props.attackAsync}
        isBoss={boss}
        bossTimer={this.props.bossTimer}
        />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //Hero
    heroName: state.heroName,
    heroClickDamage: state.heroClickDamage,
    heroDPS: state.heroDPS,
    heroCash: state.heroCash,
    clickUpgradePrice: state.clickUpgradePrice,
    //Monster
    monsterName: state.monsterName,
    healthMax: state.healthMax,
    healthRemain: state.healthRemain,
    monsterLevel: state.monsterLevel,
    bossTimer: state.bossTimer,
    isBoss: state.isBoss,
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
    nextLevel: () => dispatch({type: "NEXT_LEVEL"}),
    attackAsync: () => dispatch({type: "ATTACK_ASYNC"}),
    buyAutoAsync: (index) => dispatch({type: "BUY_AUTO_ASYNC", index: index}),
    buyClickAsync: () => dispatch({type: "INCREASE_CLICK_DAMAGE_ASYNC"}),
    bossFight: () => dispatch({type: "BOSS_FIGHT"}),
    prevLevel: () => dispatch({type: "PREV_LEVEL"}),
    moreMoney: () => dispatch({type: "MORE_MONEY"}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
