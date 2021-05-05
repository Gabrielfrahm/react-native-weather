import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandPage from './pages/Landpage';
import Search from './pages/Search';


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
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="LandPage">
      <Drawer.Screen name="LandPage" component={LandPagScreen} />
      <Drawer.Screen name="Search" component={SearchScreen} />
    </Drawer.Navigator>
    </NavigationContainer>
  )
}

