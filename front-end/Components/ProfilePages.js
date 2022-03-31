import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BrowsePost from '../Screens/BrowsePost'
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';

const Stack = createStackNavigator()

export default function GamePages(props){ 
    return(
    <Stack.Navigator screenOptions={{headerShown: false, initialRouteName: "ProfileDefault"}}>
          <Stack.Screen name="ProfileDefault" component={Profile} />
        </Stack.Navigator>
    );
}