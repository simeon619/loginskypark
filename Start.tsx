import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { Login } from './screen/Login';
import { LogoStart } from './screen/LogoStart';
import { Infolocalisation } from './screen/Signup/InfoLocalisation';
import { Infoperso } from './screen/Signup/Infoperso';
import { Infoprofile } from './screen/Signup/Infoprofile';
import { store } from './wharehouse/store';

const Stack = createNativeStackNavigator();

const Start = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          statusBarAnimation: 'slide',
          animationDuration: 2000,
        }}>
        <Stack.Screen name="logostart" component={LogoStart} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ orientation: 'portrait' }}
        />
        <Stack.Screen name="Infoperso" component={Infoperso} />
        <Stack.Screen name="Infolocalisation" component={Infolocalisation} />
        <Stack.Screen name="Infoprofile" component={Infoprofile} />
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Start;
