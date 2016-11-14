# 03 Color Picker

This sample takes as starting point _02 Change name_

> Altough we cold start from a clean project, we have decided to continue from
then change name project, just to show how isolated and how does a project
look when we have several widgets and functionallity

In this sample we will add a component that will let us change the favourite color of the
user.

Summary steps:

- Let's createa color entiy.
- Let's create an update color action.
- Let's define a new entry to the `userProfileReducer` to store the favourite color.
- Let's create the needed `colorPicker` components, plus subcomponents.
- Let's wire it all up in a container component.


# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _02 ChangeName_ and execute:

  ```
  npm install
  ```

- Let's add a new property to the _./src/common/actionsEnums.js_

  ```javascript
  const actionsEnums = {
    UPDATE_USERPROFILE_NAME: 'UPDATE_USERPROFILE_NAME',
    UPDATE_USERPROFILE_FAVOURITE_COLOR: 'UPDATE_USERPROFILE_FAVOURITE_COLOR',
  };

  export default actionsEnums;

  ```

- Let's create an update color action (_./src/actions/updateFavouriteColor.js_).

  ```javascript
  import actionsEnums from '../common/actionsEnums';

  const updateFavouriteColor = newColor => (
    {
      type: actionsEnums.UPDATE_USERPROFILE_FAVOURITE_COLOR,
      newColor,
    }
  );

  export default updateFavouriteColor;

  ```

- Let's define a new entry to the _./src/reducers/userProfile.js_ to store the favourite color.

  ```javascript
  import actionsEnums from '../common/actionsEnums';

  const objectAssign = require('object-assign');

  class UserProfileState {
    constructor() {
      this.firstname = 'Default name';
      this.favouriteColor = { red: 0, green: 0, blue: 180 };
    }
  }

  const handleUserProfileAction = (state, action) => {
    const newState = objectAssign({}, state, { firstname: action.newName });
    return newState;
  };

  const handleFavouriteColorAction = (state, action) => {
    const newState = objectAssign({}, state, { favouriteColor: action.newColor });
    return newState;
  };

  const userProfileReducer = (state = new UserProfileState(), action) => {
    switch (action.type) {
      case actionsEnums.UPDATE_USERPROFILE_NAME:
        return handleUserProfileAction(state, action);
      case actionsEnums.UPDATE_USERPROFILE_FAVOURITE_COLOR:
        return handleFavouriteColorAction(state, action);
      default:
    }
    return state;
  };

  export default userProfileReducer;

  ```

- Let's create the needed colorPicker components, plus subcomponents.

  _./src/colorSlider.jsx_:

  ```jsx
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

  ```

  _./src/colorPicker.jsx_:

  ```jsx
  import React from 'react';
  import ColorSlider from './colorSlider';

  const ColorPicker = props => (
    <div>
      <ColorSlider
        value={props.color.red}
        onValueUpdated={value => props.onColorUpdated(
            { red: value, green: props.color.green, blue: props.color.blue },
          )
        }
      />
      <br />
      <ColorSlider
        value={props.color.green}
        onValueUpdated={
          value => props.onColorUpdated(
            { red: props.color.red, green: value, blue: props.color.blue },
          )
        }
      />
      <br />
      <ColorSlider
        value={props.color.blue}
        onValueUpdated={
          value => props.onColorUpdated(
            { red: props.color.red, green: props.color.green, blue: value },
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

  ```

  _./src/colorDisplayer.jsx_:

  ```jsx
  import React from 'react';

  const ColorDisplayer = (props) => {
    // `rgb(${props.color.red},${props.color.green}, ${props.color.blue}) })`
    // 'rgb(' + props.color.red + ', 40, 80)'
    const divStyle = {
      width: '120px',
      height: '80px',
      backgroundColor: `rgb(${props.color.red},${props.color.green}, ${props.color.blue})`,
    };

    return (
      <div style={divStyle} />
    );
  };

  ColorDisplayer.propTypes = {
    color: React.PropTypes.shape({
      red: React.PropTypes.number.isRequired,
      green: React.PropTypes.number.isRequired,
      blue: React.PropTypes.number.isRequired,
    }).isRequired,
  };

  export default ColorDisplayer;

  ```

- Let's create a `ColorDisplayerContainer` in _./src/colorDisplayerContainer.js_:

  ```javascript
  import { connect } from 'react-redux';
  import ColorDisplayer from './colorDisplayer';

  const mapStateToProps = state => (
    {
      color: state.userProfileReducer.favouriteColor,
    }
  );

  const mapDispatchToProps = () => (
    {}
  );

  const ColorDisplayerContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ColorDisplayer);

  export default ColorDisplayerContainer;

  ```

- We can add it to our _app.jsx_ and perform a quick check.

  ```jsx
  import React from 'react';
  import HelloWorldContainer from './helloWorldContainer';
  import NameEditContainer from './nameEditContainer';
  import ColorDisplayerContainer from './colorDisplayerContainer';

  const App = () => (
    <div>
      <HelloWorldContainer />
      <br />
      <NameEditContainer />
      <br />
      <ColorDisplayerContainer />
    </div>
  );

  export default App;

  ```


- Let's create a `ColorPickerContainer`: _colorPickerContainer.jsx_.

  ```javascript
  import { connect } from 'react-redux';
  import ColorPicker from './colorPicker';
  import updateFavouriteColor from './actions/updateFavouriteColor';

  const mapStateToProps = state => (
    {
      color: state.userProfileReducer.favouriteColor,
    }
  );

  const mapDispatchToProps = dispatch => (
    {
      onColorUpdated: color => (
        dispatch(updateFavouriteColor(color))
      ),
    }
  );

  const ColorPickerContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ColorPicker);

  export default ColorPickerContainer;

  ```

- And let's consume it in the _app.jsx_

  ```jsx
  import React from 'react';
  import HelloWorldContainer from './helloWorldContainer';
  import NameEditContainer from './nameEditContainer';
  import ColorDisplayerContainer from './colorDisplayerContainer';
  import ColorPickerContainer from './colorPickerContainer';

  const App = () => (
    <div>
      <HelloWorldContainer />
      <br />
      <NameEditContainer />
      <br />
      <ColorDisplayerContainer />
      <br />
      <ColorPickerContainer />
    </div>
  );

  export default App;

  ```
