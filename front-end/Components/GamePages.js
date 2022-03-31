import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BrowsePost from '../Screens/BrowsePost'
import Home from '../Screens/Home';

const Stack = createStackNavigator()

export default function GamePages(props){ 
    return(
    <Stack.Navigator screenOptions={{headerShown: false, initialRouteName: "HomePage"}}>
          <Stack.Screen name="HomePage" component={Home} />
          <Stack.Screen name="csgo" component={BrowsePost} />
          <Stack.Screen name="league_of_legends" component={BrowsePost} />
          <Stack.Screen name="minecraft" component={BrowsePost} />
          <Stack.Screen name="valorant" component={BrowsePost} />
        </Stack.Navigator>
    );
}