import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Settings from '../Screens/Settings'
import ResetPassword from '../Screens/ResetPassword'
import ConfirmScreen from '../Screens/ConfirmScreen'

const Stack = createStackNavigator()

export default function SettingPages(props){ 
    return(
        <Stack.Navigator screenOptions={{headerShown: false, initialRouteName: "Home"}}>
          <Stack.Screen name="Home" component={Settings} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="ConfirmScreen" component={ConfirmScreen} />
        </Stack.Navigator>
    );
}