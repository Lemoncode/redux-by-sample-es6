# 02 Change Name

This sample takes as starting point _01 helloRedux_

In this sample we will add a component that will let us change the name of the
user.


Summary steps:

- Install object assign polyfill library.
- Let's create an _app_ component and instantiate in main.jsx
- Create a `nameEdit` presentational component.
- Create an action const file.
- Create an action dispatcher to get the name updated.
- Handle this action in the reducer.
- Create a `nameEditContainer` component to wire it up.
- Let's instantiate `nameEditContainer`.

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _01 Hello Redux_ and execute:

  ```
  npm install
  ```

- Let's install _object-assign_:

  ```
  npm install object-assign --save
  ```

- Create a `nameEdit` presentational component (_nameEdit.jsx_).

  ```jsx
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

  ```

- Create an action const file, let's create them under the following
fullpath _./src/common/actionsEnums.js_.

  ```javascript
  const actionsEnums = {
    UPDATE_USERPROFILE_NAME: 'UPDATE_USERPROFILE_NAME',
  };

  export default actionsEnums;

  ```

- Create an action dispatcher to get the name updated, full path:
_./src/actions/updateUserProfileName.js_.

  ```javascript
  import actionsEnums from '../common/actionsEnums';

  const updateUserProfileName = newName => (
    {
      type: actionsEnums.UPDATE_USERPROFILE_NAME,
      newName,
    }
  );

  export default updateUserProfileName;

  ```

- Handle this action in the reducer, _./src/reducers/userProfile.js_.

  ```javascript
  import actionsEnums from '../common/actionsEnums';

  const objectAssign = require('object-assign');

  class UserProfileState {
    constructor() {
      this.firstname = 'Default name';
    }
  }

  const handleUserProfileAction = (state, action) => {
    const newState = objectAssign({}, state, { firstname: action.newName });
    return newState;
  };

  const userProfileReducer = (state = new UserProfileState(), action) => {
    switch (action.type) {
      case actionsEnums.UPDATE_USERPROFILE_NAME:
        return handleUserProfileAction(state, action);
      default:
    }
    return state;
  };

  export default userProfileReducer;

  ```

- Create a `nameEditContainer` component to wire it up in file _nameEditContainer.js_.

  ```javascript
  import { connect } from 'react-redux';
  import NameEditComponent from './nameEdit';
  import updateUserProfileName from './actions/updateUserProfileName';

  const mapStateToProps = state => (
    {
      userName: state.userProfileReducer.firstname,
    }
  );

  const mapDispatchToProps = dispatch => (
    {
      onChange: name => (
        dispatch(updateUserProfileName(name))
      ),
    }
  );

  const HelloWorldContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NameEditComponent);

  export default HelloWorldContainer;

  ```

- Let's create an `App` component (_app.jsx_) and instantiate in _main.jsx_:

  ```jsx
  import React from 'react';
  import HelloWorldContainer from './helloWorldContainer';
  import NameEditContainer from './nameEditContainer';

  const App = () => (
    <div>
      <HelloWorldContainer />
      <br />
      <NameEditContainer />
    </div>
  );

  export default App;

  ```

  ```jsx
  /* global document */

  import React from 'react';
  import { render } from 'react-dom';
  import { createStore } from 'redux';
  import { Provider } from 'react-redux';
  import reducers from './reducers';
  import App from './app';

  const store = createStore(reducers);

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );

  ```

- Let's test the sample:

  ```
  npm start
  ```
