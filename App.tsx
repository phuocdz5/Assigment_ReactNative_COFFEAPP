import React, { useEffect, useState } from 'react';
import { SplashScreen } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppRouters from './src/navigators/AppRouters';

const App = () => {

  return (
    <>
      <Provider store={store}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent />
        <NavigationContainer>
          <AppRouters />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
