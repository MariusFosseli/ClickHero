import React from 'react';
import {PropTypes} from 'prop-types';

const Hero = props => {
  return(
    <div>
    <div className={"Hero_stats"}>
      <h3>Hero name: {props.heroName}</h3>
      <p>Click damage: {props.heroClickDamage}</p>
      <p>DPS: {props.heroDPS}</p>
      <p>Hero cash: {props.heroCash}</p>

      <button onClick={ () => props.increaseClickDamage() }>Upgrade Damage, price {props.clickUpgradePrice}</button>

      <button onClick={ () => props.buyClickAsync()}>Increase damage after 3 seconds</button>

    </div>
    </div>

  )
};

Hero.propTypes = {
  heroName: PropTypes.string.isRequired,
  heroClickDamage: PropTypes.number.isRequired,
  heroDPS: PropTypes.number.isRequired,
  heroCash: PropTypes.number.isRequired,
  increaseClickDamage: PropTypes.func.isRequired,
};

export default Hero;