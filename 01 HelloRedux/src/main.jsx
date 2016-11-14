/* global document */

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import HelloWorldContainer from './helloWorldContainer';

const store = createStore(reducers);

render(
  <Provider store={store}>
    <HelloWorldContainer />
  </Provider>,
  document.getElementById('root'),
);
