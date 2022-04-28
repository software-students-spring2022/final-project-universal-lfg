import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Theme from './theme'
import StartScreen from './Screens/StartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import Dashboard from './Screens/Dashboard'
import BrowsePost from './Screens/BrowsePost'
import CreatePost from './Screens/CreatePost'
import MyPosts from './Screens/MyPosts'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={Theme}>
      <NavigationContainer theme={Theme}>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="BrowsePost" component={BrowsePost} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen name="MyPosts" component={MyPosts} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
