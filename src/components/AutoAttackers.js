import React from 'react';
import PropTypes from 'prop-types';



const AutoAttackers = (props) => {

  return (
    <div>
      <div className={"Small_stats"}>
      <h4>{props.autoName} level {props.timesBought}</h4>
      <button onClick={ () => props.buyAutoAttacker(props.index) }>BUY</button>
        <p>DPS: {props.autoDPS} - price: {props.autoPrice}</p>

        <button onClick={ () => props.buyAutoAsync()}>Buy after 5 seconds</button>
    </div>
    </div>
  );
};

AutoAttackers.propTypes = {
  index: PropTypes.number.isRequired,
  autoName: PropTypes.string.isRequired,
  autoPrice: PropTypes.number.isRequired,
  autoDPS: PropTypes.number.isRequired,
  timesBought: PropTypes.number.isRequired,
  buyAutoAttacker: PropTypes.func.isRequired,
};

export default AutoAttackers;