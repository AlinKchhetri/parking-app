/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import store from './redux/store';
import Tabs from "./navigation/Tabs";
import Stacks from "./navigation/Stacks";
import { COLORS, lightFONTS, darkFONTS } from './constants';
import Toast, {BaseToast}  from 'react-native-toast-message'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const toastConfig = {

  success: (props) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: COLORS.green, borderLeftColor:COLORS.green, opacity: 0.8 }}
      text1Style={{
        ...darkFONTS.body4,
        textAlign: 'center',
      }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: COLORS.red, borderLeftColor:COLORS.red, opacity: 0.8 }}
      text1Style={{
        ...darkFONTS.body3,
        textAlign: 'center',
      }}
    />
  )
};

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    "Roboto-Black": require('./assets/fonts/Roboto-Black.ttf'),
    "Roboto-Bold": require('./assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Regular": require('./assets/fonts/Roboto-Regular.ttf'),
  })

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <Stacks />
      <Toast config={toastConfig} />
    </Provider>
  )
}

export default App;
