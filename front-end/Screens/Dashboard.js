
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Theme from '../theme.js'
import GamePages from '../Components/GamePages.js';
import CustomDrawer from '../Components/CustomDrawer.js';
import TeamPages from '../Components/TeamPages.js';
import SettingPages from '../Components/SettingPages.js';
import ProfilePages from '../Components/ProfilePages.js';
import ChatRoom from '../Screens/ChatRoom.js'
import { StreamChat } from 'stream-chat';
import { Channel, Chat, ChannelList, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider } from 'stream-chat-expo';
const CHAT_API_KEY = 'fgmh55s8ehws'
export default function Dashboard({ navigation }) {
    const Drawer = createDrawerNavigator(); 
    const chatClient = StreamChat.getInstance(CHAT_API_KEY);

    useEffect(() => {
      const connectChat = async () => {
        await chatClient.connectUser({
          id:'tstephen22', 
          name: 'Theo'}, 
          chatClient.devToken('tstephen22'));
      };
      connectChat();
    }, []);

    return(
    <SafeAreaProvider>
      <ChatOverlayProvider topInset={0}>
        <Chat client={chatClient}>
          <Drawer.Navigator drawerContent ={(props) => <CustomDrawer {...props}/>} screenOptions={{drawerType:'front', headerTitle:'ULFG', headerTintColor: Theme.colors.primary}}>
            <Drawer.Screen name='Home' component={GamePages}/>
            <Drawer.Screen name='Profile' component={ProfilePages}/>
            <Drawer.Screen name='Settings' component={SettingPages}/>
            <Drawer.Screen name='Messages' component={ChatRoom}/>
            <Drawer.Screen name='My Teams' component={TeamPages}/>
          </Drawer.Navigator> 
          </Chat>
        </ChatOverlayProvider>
     </SafeAreaProvider>
    )
}

function hide() { 
    return(
      <></>
    )
} 