import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Channel, Chat, ChannelList, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider, setActiveChannel } from 'stream-chat-expo';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import ChatSettings from '../Components/ChatComponents/ChatSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../url.json'
const API_KEY = 'fgmh55s8ehws'

//Instance of chat client 
const chatClient = StreamChat.getInstance(API_KEY);
const SideMenu = createDrawerNavigator(); 

function ChatRoom({route, navigation}) {
  const headStackNav = route.params.navigation
  const { title, lobbyId } = route.params.lobbyParams
  const channel = chatClient.channel('messaging', lobbyId)
  const [ready, setReady] = useState(false)
  const [joined, setJoined] = useState(false)
  useEffect(() =>{
      async function connectUser(){
          await channel.watch()
          if(!joined) {
            channel.addMembers([chatClient.user.id], {text:`${chatClient.user.name} has joined the lobby -- Say Hi!`})
            console.log('joining')
          }
          setReady(true)
      }
      connectUser()
      headStackNav.setOptions({title:title})
  }, [])

  if(!ready) return null
  return (
    <SafeAreaProvider>
    <Swipeable>
        <Channel channel={channel} keyboardVerticalOffset={0}>
        <MessageList/>
        <MessageInput />
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.button}/>
        </Channel>
        </Swipeable>
    </SafeAreaProvider>
  );
}
/*
  ChatRoomStack -- Only here so the side menu can be used 
*/
export default function ChatRoomStack({route, navigation}){
  const {lobbyId} = route.params.lobbyParams;
  return(
    <SideMenu.Navigator drawerContent={(props) => <ChatSettings lobbyId={lobbyId} navigation={navigation}/>} screenOptions={{drawerPosition:'right',headerShown:false,drawerStyle:{right:0}}}>
      <SideMenu.Screen name='MESSAGES' component={ChatRoom} initialParams={{lobbyParams:route.params.lobbyParams, navigation:navigation}}
        options={{headerShown:false}}
      />
    </SideMenu.Navigator>
  )
}

const styles = StyleSheet.create({
  button:{
    position: 'absolute',
    top:10,
    left:30, 
    height:50,
    width:50,
    backgroundColor: 'red'
  }
})
