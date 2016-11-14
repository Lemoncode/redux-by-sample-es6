import React from 'react';

const NameEditComponent = props => (
  <div>
    <label htmlFor="name-edit">Update Name:</label>
    <input
      id="name-edit"
      value={props.userName}
      onChange={e => props.onChange(e.target.value)}
    />
  </div>
);

NameEditComponent.propTypes = {
  userName: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default NameEditComponent;
