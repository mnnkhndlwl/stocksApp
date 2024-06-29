import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainContainer from './src/navigation/MainContainer';

function App() {
  return (
    <NavigationContainer>
      <MainContainer />
    </NavigationContainer>
  );
}

export default App;
