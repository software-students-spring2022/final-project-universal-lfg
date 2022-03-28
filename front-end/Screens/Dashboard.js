
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home.js';
import Theme from '../theme.js'
import GamePages from '../Components/GamePages.js';
import Settings from './Settings.js';
import Messages from './Messages.js';
import MyPosts from './MyPosts.js';
import Profile from'./Profile.js';

export default function Dashboard({ navigation }) {
    const Drawer = createDrawerNavigator(); 

    return(
    <SafeAreaProvider>
          <Drawer.Navigator screenOptions={{drawerType:'front', headerTitle:'ULFG', headerTintColor: Theme.colors.primary}}>
            <Drawer.Screen name='Home' component={GamePages}/>
            <Drawer.Screen name='Profile' component={Profile}/>
            <Drawer.Screen name='Settings' component={Settings}/>
            <Drawer.Screen name='Messages' component={Messages}/>
            <Drawer.Screen name='Posts' component={MyPosts}/>
          </Drawer.Navigator> 
     </SafeAreaProvider>
    )
}