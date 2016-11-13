import * as React from 'react';

const HelloWorldComponent = props => (
  <h2>Hello Mr. {props.userName}!</h2>
);

HelloWorldComponent.propTypes = {
  userName: React.PropTypes.string.isRequired,
};

export default HelloWorldComponent;
