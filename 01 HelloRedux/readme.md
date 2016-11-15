# 01 Hello Redux

In this sample we will create a full react + redux app just to display a HelloWorld message like.
Of course doing such thing is an overkill, is just to tackle on a simple sample and learn the
concepts.

We will take a startup point sample _00 Boilerplate_.


Summary steps:

- Install react, react-dom, redux libraries.
- Install react, react-dom, redux typescript definitions.
- Update the index.html to create a placeholder for the react components.
- Create a HelloWorld component.
- Create an _main.jsx_ as entry point.
- Create the react-dom entry point _main.jsx_.
- Create a reducer (it will hold user name).
- Wire it up.
- Create a HelloworldContainer component and perform the connections.
- Include this HelloworldContainer component in the _main.jsx_

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _00 Boilerplate_ and execute:

  ```
  npm install
  ```

- Let's install react, react-dom and redux libraries:

  ```
  npm install react react-dom redux react-redux --save
  ```

- Rename the file _./src/main.js_ to _./src/main.jsx_.

- Update webpack config in the _./src/webpack.config.js_ file, in order to take as entry point _main.jsx_

  ```javascript
  entry: [
    './main.jsx',
    '../node_modules/bootstrap/dist/css/bootstrap.css'
  ],
  ```

- Update the _index.html_ to create a placeholder for the react components

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Redux-by-sample ES6</title>
    </head>
    <body>
      <h1>Sample app</h1>
      <div id="root">
      </div>    
    </body>
  </html>
  ```

- Create the react-dom entry point _main.jsx_.

  ```jsx
  /* global document */

  import * as React from 'react';
  import * as ReactDOM from 'react-dom';

  ReactDOM.render(
    <h2>Temp content</h2>,
    document.getElementById('root'),
  );

  ```

- Create a `HelloWorld` component with path _./src/helloWorld.jsx_:

  ```jsx
  import * as React from 'react';

  const HelloWorldComponent = props => (
    <h2>Hello Mr. {props.userName}!</h2>
  );

  HelloWorldComponent.propTypes = {
    userName: React.PropTypes.string.isRequired,
  };

  export default HelloWorldComponent;

  ```

- Create a reducer (it will hold user name), path: _./src/reducers/userProfile.js_.

  ```javascript
  class UserProfileState {
    constructor() {
      this.firstname = 'Default name';
    }
  }

  // eslint-disable-next-line no-unused-vars
  const userProfileReducer = (state = new UserProfileState(), action) => (
    state
  );

  export default userProfileReducer;

  ```

- Let's create an index file under _./src/reducers/index.js_ this file will
combine all reducers references in the future.

  ```javascript
  import { combineReducers } from 'redux';
  import userProfileReducer from './userProfile';

  const reducers = combineReducers({
    userProfileReducer,
  });

  export default reducers;

  ```

- Wire it up _main.jsx_.

  ```jsx
  /* global document */

  import * as React from 'react';
  import * as ReactDOM from 'react-dom';
  import { createStore } from 'redux';
  import { Provider } from 'react-redux';
  import reducers from './reducers';
  import HelloWorldContainer from './helloWorldContainer';

  const store = createStore(reducers);

  ReactDOM.render(
    <Provider store={store}>
      <h2>Temp Content</h2>
    </Provider>,
    document.getElementById('root'),
  );
  ```


- Create a `HelloworldContainer` component and perform the connections, full path
_./src/helloWorldContainer.js_.

  ```javascript
  import { connect } from 'react-redux';
  import HelloWorldComponent from './helloWorld';

  const mapStateToProps = state => (
    {
      userName: state.userProfileReducer.firstname,
    }
  );

  const mapDispatchToProps = () => (
    {
    }
  );

  const HelloWorldContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HelloWorldComponent);

  export default HelloWorldContainer;

  ```

- Include this `HelloworldContainer` component in the application, path: _.src/main.jsx_

  ```jsx
  /* global document */

  import * as React from 'react';
  import * as ReactDOM from 'react-dom';
  import { createStore } from 'redux';
  import { Provider } from 'react-redux';
  import reducers from './reducers';
  import HelloWorldContainer from './helloWorldContainer';

  const store = createStore(reducers);

  ReactDOM.render(
    <Provider store={store}>
      <HelloWorldContainer />
    </Provider>,
    document.getElementById('root'),
  );

  ```

- Let's give a try to the sample.

  ```
  npm start
  ```
