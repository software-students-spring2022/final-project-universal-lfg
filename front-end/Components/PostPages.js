import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ViewPost from '../Screens/ViewPost';

const Stack = createStackNavigator()

export default function PostPages(props){ 
    return(
        <Stack.Navigator screenOptions={{headerShown: false, initialRouteName: "Home"}}>
            <Stack.Screen name="viewpost" component={ViewPost} />
        </Stack.Navigator>
    );
}