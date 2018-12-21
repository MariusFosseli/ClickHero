import React from 'react';
import PropTypes from 'prop-types';



const AutoAttackers = (props) => {

  const { attack, defence, health, patience, greed } = props;

  return (
    <div>
      <div className={"Small_stats"}>
        <h4>{props.autoName} level {props.timesBought}</h4>
        <button onClick={ () => props.buyAutoAttacker(props.index) }>BUY</button>
        <p>DPS: {props.attack} - price: {props.autoPrice}</p>
        {attack > 0 && (<p>Attack: {attack}</p>)}
        {defence > 0 && (<p>Defence: {defence}</p>)}
        {health > 0 && (<p>Health: {health}</p>)}
        {patience > 0 && (<p>Patience: {patience}</p>)}
        {greed > 0 && (<p>Greed: {greed}</p>)}
        <button onClick={ () => props.useAbility()}>Press me</button>
      </div>
    </div>
  );
};

AutoAttackers.propTypes = {
  index: PropTypes.number.isRequired,
  autoName: PropTypes.string.isRequired,
  autoPrice: PropTypes.number.isRequired,
  timesBought: PropTypes.number.isRequired,
  buyAutoAttacker: PropTypes.func.isRequired,
  useAbility: PropTypes.func.isRequired,
  attack: PropTypes.number.isRequired,
  defence: PropTypes.number.isRequired,
  health: PropTypes.number.isRequired,
  patience: PropTypes.number.isRequired,
  greed: PropTypes.number.isRequired,
};

export default AutoAttackers;
