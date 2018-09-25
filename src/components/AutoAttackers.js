import React from 'react';
import PropTypes from 'prop-types';



const AutoAttackers = (props) => {

  return (
    <div>
      <button onClick={ () => props.buyAutoAttacker(props.index) }>
        Buy {props.autoName}! DPS: {props.autoDPS} - price: {props.autoPrice}
      </button>
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