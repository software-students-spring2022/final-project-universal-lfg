
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home.js';
import Theme from '../theme.js'
import GamePages from '../Components/GamePages.js';

export default function Dashboard({ navigation }) {
    const Drawer = createDrawerNavigator(); 

    return(
    <SafeAreaProvider>
          <Drawer.Navigator screenOptions={{drawerType:'front', headerTitle:'ULFG', headerTintColor: Theme.colors.primary}}>
            <Drawer.Screen name='Home' component={GamePages}/>
            <Drawer.Screen name='Settings' component={GamePages}/>
            <Drawer.Screen name='Messages' component={GamePages}/>
            <Drawer.Screen name='Posts' component={GamePages}/>
          </Drawer.Navigator> 
     </SafeAreaProvider>
    )
}