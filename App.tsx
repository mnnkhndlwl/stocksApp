import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainContainer from './src/navigation/MainContainer';
import {cleanUpExpiredCache} from './src/utils/ExpireCache';

function App() {
  useEffect(() => {
    cleanUpExpiredCache();
    const intervalId = setInterval(cleanUpExpiredCache, 6 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <NavigationContainer>
      <MainContainer />
    </NavigationContainer>
  );
}

export default App;
