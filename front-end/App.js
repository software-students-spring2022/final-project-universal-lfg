import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Theme from './theme'
<<<<<<< HEAD
import BrowsePost from './Screens/BrowsePost'
=======
import StartScreen from './Screens/StartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import Dashboard from './Screens/Dashboard'
>>>>>>> d2d01182a08539cae1883e739cb7b5321034145e

const Stack = createStackNavigator()

export default function App() {
  return (
<<<<<<< HEAD
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

=======
    <Provider theme={Theme}>
      <NavigationContainer>
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
>>>>>>> d2d01182a08539cae1883e739cb7b5321034145e
}
