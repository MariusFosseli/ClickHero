import React from 'react';
import {PropTypes} from 'prop-types';
import AutoAttackers from './AutoAttackers';

const Hero = props => {

  const AutoAttackerComponent = props.heroes.map((hero, index) => (
    <AutoAttackers
      key={index}
      index={index}
      autoName={hero.autoName}
      autoPrice={hero.autoPrice}
      attack={hero.attack}
      timesBought={hero.timesBought}
      buyAutoAttacker={props.buyAutoAttacker}
    />
  ));
  return(
    <div>
      <div className={"Hero_stats"}>
        <h3>Hero name: Hero</h3>
        <p>Hero cash: {props.heroCash}</p>
        <p>Health Remaining: {props.heroRemainingHealth}</p>
        <p>Click damage: {props.heroClickDamage}</p>
        <p>DPS: {props.heroDPS}</p>
        <p>Defence: {props.heroDefence}</p>

        <button onClick={ () => props.increaseClickDamage() }>Upgrade Damage, price {props.clickUpgradePrice}</button>

        <button onClick={ () => props.toggleAutoIncrease() }>Auto Increase levels: {props.autoIncrease.toString()}</button>

        {AutoAttackerComponent}
      </div>
    </div>

  )
};

Hero.propTypes = {
  heroClickDamage: PropTypes.number.isRequired,
  heroRemainingHealth: PropTypes.number.isRequired,
  heroDPS: PropTypes.number.isRequired,
  heroDefence: PropTypes.number.isRequired,
  heroCash: PropTypes.number.isRequired,
  increaseClickDamage: PropTypes.func.isRequired,
  autoIncrease: PropTypes.bool.isRequired,
};

export default Hero;
