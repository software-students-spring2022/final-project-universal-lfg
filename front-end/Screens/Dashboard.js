
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Theme from '../theme.js'
import GamePages from '../Components/GamePages.js';
import Messages from './Messages.js';
import CustomDrawer from '../Components/CustomDrawer.js';
import TeamPages from '../Components/TeamPages.js';
import SettingPages from '../Components/SettingPages.js';
import ProfilePages from '../Components/ProfilePages.js';

export default function Dashboard({ navigation }) {
    const Drawer = createDrawerNavigator(); 
    
    return(
    <SafeAreaProvider>
          <Drawer.Navigator drawerContent ={(props) => <CustomDrawer {...props}/>} screenOptions={{drawerType:'front', headerTitle:'ULFG', headerTintColor: Theme.colors.primary}}>
            <Drawer.Screen name='Home' component={GamePages}/>
            <Drawer.Screen name='Profile' component={ProfilePages}/>
            <Drawer.Screen name='Settings' component={SettingPages}/>
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