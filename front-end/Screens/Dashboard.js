
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet} from '@react-navigation/native';
import Home from './Home.js';
import Theme from '../theme.js'
import GamePages from '../Components/GamePages.js';
import Settings from './Settings.js';
import Messages from './Messages.js';
import MyPosts from './MyPosts.js';
import Profile from './Profile.js'
import CustomDrawer from '../Components/CustomDrawer.js';
import ProfilePages from '../Components/ProfilePages.js';
import TeamPages from '../Components/TeamPages.js';

export default function Dashboard({ navigation }) {
    const Drawer = createDrawerNavigator(); 
    
    return(
    <SafeAreaProvider>
          <Drawer.Navigator drawerContent ={(props) => <CustomDrawer {...props}/>} screenOptions={{drawerType:'front', headerTitle:'ULFG', headerTintColor: Theme.colors.primary}}>
            <Drawer.Screen name='Home' component={GamePages}/>
            <Drawer.Screen name='Profile' component={Profile}/>
            <Drawer.Screen name='Settings' component={Settings}/>
            <Drawer.Screen name='Messages' component={Messages}/>
            <Drawer.Screen name='My Teams' component={TeamPages}/>

          </Drawer.Navigator> 
     </SafeAreaProvider>
    )
}

function hide() { 
    return(
      <></>
    )
} 