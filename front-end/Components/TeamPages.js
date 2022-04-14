import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MyPosts from '../Screens/MyPosts'
import HostViewPost from '../Screens/HostViewPost'

const Stack = createStackNavigator()

export default function TeamPages(props){ 
    return(
        <Stack.Navigator screenOptions={{headerShown: false, initialRouteName: "Home"}}>
          <Stack.Screen name="Home" component={MyPosts} />
          <Stack.Screen name="HostViewPost" component={HostViewPost} />
        </Stack.Navigator>
    );
}