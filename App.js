import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandPage from './pages/Landpage';
import Search from './pages/Search';
import Weather from './pages/Weather';
import store from './store';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const LandPagScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LandPage" component={LandPage} />
    </Stack.Navigator>
  )
}

const SearchScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen  name="Search" component={Search} />
      <Stack.Screen name="Weather" component={Weather} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Search">
          <Drawer.Screen name="LandPage" component={LandPagScreen} />
          <Drawer.Screen name="Search" component={SearchScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

