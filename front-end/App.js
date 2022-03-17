import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Components/Home'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Theme from './theme'

export default function App() {
  const Drawer = createDrawerNavigator(); 
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={Theme}> 
        <Drawer.Navigator screenOptions={{drawerType:'front', headerTitle:'ULFG', headerTintColor: Theme.colors.primary}}>
          <Drawer.Screen name='Home' component={Home}/>
          <Drawer.Screen name='Settings' component={Home}/>
          <Drawer.Screen name='Messages' component={Home}/>
          <Drawer.Screen name='Posts' component={Home}/>
        </Drawer.Navigator> 
      </NavigationContainer>
   </SafeAreaProvider>
  );
}
