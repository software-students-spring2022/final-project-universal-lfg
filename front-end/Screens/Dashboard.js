
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
import URL from '../url.json'
import { Channel, Chat, ChannelList, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider } from 'stream-chat-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CHAT_API_KEY = 'fgmh55s8ehws'

export default function Dashboard({ navigation }) {

    const Drawer = createDrawerNavigator(); 
    const chatClient = StreamChat.getInstance(CHAT_API_KEY);

    const connectChat = async() => {
      try {
        const token = await AsyncStorage.getItem('token')
        const res = await fetch(URL.url+'/chat-token', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        });
        const response = await res.json()
        await chatClient.connectUser({
          id: response.id, 
          name: response.name}, 
          token);
      } catch (err) { 
        console.log(err)
      }
    }

    useEffect(() => {
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