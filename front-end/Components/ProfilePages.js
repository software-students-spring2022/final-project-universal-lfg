import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../Screens/Profile'
import ResetUsername from '../Screens/ResetUsername.js'
import ResetEmail from '../Screens/ResetEmail.js'

const Stack = createStackNavigator()

export default function SettingPages(props){ 
    return(
        <Stack.Navigator screenOptions={{headerShown: false, initialRouteName: "Home"}}>
          <Stack.Screen name="Home" component={Profile} />
          <Stack.Screen name="ResetUsername" component={ResetUsername} />
          <Stack.Screen name="ResetEmail" component={ResetEmail} />
        </Stack.Navigator>
    );
}