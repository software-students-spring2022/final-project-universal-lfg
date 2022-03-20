
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home.js';
import Theme from '../theme.js'

export default function Dashboard({ navigation }) {
    const Drawer = createDrawerNavigator(); 

    return(
    <SafeAreaProvider>
          <Drawer.Navigator screenOptions={{drawerType:'front', headerTitle:'ULFG', headerTintColor: Theme.colors.primary}}>
            <Drawer.Screen name='Home' component={Home}/>
            <Drawer.Screen name='Settings' component={Home}/>
            <Drawer.Screen name='Messages' component={Home}/>
            <Drawer.Screen name='Posts' component={Home}/>
          </Drawer.Navigator> 
     </SafeAreaProvider>
    )
}