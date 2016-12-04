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
