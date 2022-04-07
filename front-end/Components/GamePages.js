import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BrowsePost from '../Screens/BrowsePost'
import ViewPost from '../Screens/ViewPost'
<<<<<<< Updated upstream
import HostViewPost from '../Screens/HostViewPost'
import Home from '../Screens/Home';
=======
import Home from '../Screens/Home'
import CreatePost from '../Screens/CreatePost';
>>>>>>> Stashed changes

const Stack = createStackNavigator()

export default function GamePages(props){ 
    return(
    <Stack.Navigator screenOptions={{headerShown: false, initialRouteName: "HomePage"}}>
          <Stack.Screen name="HomePage" component={Home} />
          <Stack.Screen name="csgo" component={BrowsePost} />
          <Stack.Screen name="league_of_legends" component={BrowsePost} />
          <Stack.Screen name="minecraft" component={BrowsePost} />
          <Stack.Screen name="valorant" component={BrowsePost} />
          <Stack.Screen name="ViewPost" component={ViewPost} />
<<<<<<< Updated upstream
          <Stack.Screen name="HostViewPost" component={HostViewPost} />
=======
          <Stack.Screen name="CreatePost" component={CreatePost} />
>>>>>>> Stashed changes
        </Stack.Navigator>
    );
}