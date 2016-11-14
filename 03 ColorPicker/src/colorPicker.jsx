import React from 'react';
import ColorSlider from './colorSlider';

const ColorPicker = props => (
  <div>
    <ColorSlider
      value={props.color.red}
      onValueUpdated={value => props.onColorUpdated(
          { red: parseInt(value, 10), green: props.color.green, blue: props.color.blue },
        )
      }
    />
    <br />
    <ColorSlider
      value={props.color.green}
      onValueUpdated={
        value => props.onColorUpdated(
          { red: props.color.red, green: parseInt(value, 10), blue: props.color.blue },
        )
      }
    />
    <br />
    <ColorSlider
      value={props.color.blue}
      onValueUpdated={
        value => props.onColorUpdated(
          { red: props.color.red, green: props.color.green, blue: parseInt(value, 10) },
        )
      }
    />
  </div>
);

ColorPicker.propTypes = {
  color: React.PropTypes.shape({
    red: React.PropTypes.number.isRequired,
    green: React.PropTypes.number.isRequired,
    blue: React.PropTypes.number.isRequired,
  }).isRequired,
  onColorUpdated: React.PropTypes.func.isRequired,
};

export default ColorPicker;
