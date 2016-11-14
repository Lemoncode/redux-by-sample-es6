import React from 'react';

const ColorSlider = props => (
  <div>
    <input
      type="range"
      min="0"
      max="255"
      value={props.value}
      onChange={event => props.onValueUpdated(event.target.value)}
    />
    {props.value}
  </div>
);

ColorSlider.propTypes = {
  value: React.PropTypes.number.isRequired,
  onValueUpdated: React.PropTypes.func.isRequired,
};

export default ColorSlider;
