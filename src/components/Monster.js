import React from 'react';
import {PropTypes} from 'prop-types';

const Monster = props => {
  return(
  <div className={"Monster_stats"}>
    <div className={"Monster_img"}
      onClick={ () => props.clickAttackMonster(props.healthRemain - props.heroClickDamage)}>

    </div>
    <div>
      <h3>Name: {props.monsterName}</h3>
      <p>Health: {props.healthMax}</p>
      <p>Health remaining: {props.healthRemain}</p>
      <p>Level: {props.monsterLevel}</p>
    </div>
    <button onClick={ () => props.attackAsync()}>Attack after 1 second</button>
  </div>
  )
};

Monster.propTypes = {
  monsterName: PropTypes.string.isRequired,
  healthMax: PropTypes.number.isRequired,
  healthRemain: PropTypes.number.isRequired,
  monsterLevel: PropTypes.number.isRequired,
  clickAttackMonster: PropTypes.func.isRequired,
};

export default Monster;