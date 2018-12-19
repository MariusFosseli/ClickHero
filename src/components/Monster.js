import React from 'react';
import {PropTypes} from 'prop-types';



const Monster = props => {
  return(
    <div className={"Monster_stats"}>
      <div className={"Monster_img"}
        onClick={ () => props.clickAttackMonster(props.monsterRemainingHealth - props.heroClickDamage)}>
      </div>
      <div>
        <h3>Name: Monster</h3>
        <p>Health: {props.monsterMaxHealth}</p>
        <p>Health remaining: {props.monsterRemainingHealth}</p>
        <p>Level: {props.monsterLevel}</p>
        <p>Damage: {props.monsterDamage}</p>
      </div>
    </div>
  )
};

Monster.propTypes = {
  monsterMaxHealth: PropTypes.number.isRequired,
  monsterRemainingHealth: PropTypes.number.isRequired,
  monsterLevel: PropTypes.number.isRequired,
  clickAttackMonster: PropTypes.func.isRequired,
  isBoss: PropTypes.bool.isRequired,
  monsterDamage: PropTypes.number.isRequired,
};

export default Monster;