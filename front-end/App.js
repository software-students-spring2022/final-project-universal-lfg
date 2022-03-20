import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Theme from './theme'
import BrowsePost from './Screens/BrowsePost'

export default function App() {
  const Drawer = createDrawerNavigator(); 

  return (
      <SafeAreaProvider>
        <NavigationContainer theme={Theme}> 
          <Drawer.Navigator screenOptions={{drawerType:'front', headerTitle:'ULFG', headerTintColor: Theme.colors.primary}}>
            <Drawer.Screen name='Home' component={Home}/>
            <Drawer.Screen name='Settings' component={BrowsePost}/>
            <Drawer.Screen name='Messages' component={Home}/>
            <Drawer.Screen name='Posts' component={Home}/>
          </Drawer.Navigator> 
        </NavigationContainer>
     </SafeAreaProvider>
    );

}
