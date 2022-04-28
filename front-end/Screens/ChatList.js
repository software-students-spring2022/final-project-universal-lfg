import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { StreamChat } from 'stream-chat';
import { useChatContext, Channel, Chat, ChannelList, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider} from 'stream-chat-expo';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DeepPartial, Theme } from 'stream-chat-expo';
const Stack = createStackNavigator()
const API_KEY = 'fgmh55s8ehws'

//Instance of chat client 
const chatClient = StreamChat.getInstance(API_KEY);

function SelectedChat({route, navigation}){
  const { channel } = useChatContext();
  const { name } = channel.data
  useEffect(() => {
    navigation.setOptions({title: name})
  }, [])
  return(
    <SafeAreaProvider>
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaProvider>
  )
}

function ChatList(props) {
  const {setActiveChannel} = useChatContext(); 
  return (
    <SafeAreaProvider>
        <ChannelList onSelect={(channel) => {
          props.navigation.navigate('ChatRoom')
          setActiveChannel(channel)}} />
    </SafeAreaProvider>
  );
}

export default function ChatListStack({route, navigation}){
  return(
      <Stack.Navigator screenOptions={{initialRouteName: "ChatList"}}>
          <Stack.Screen name = 'ChatList' component={ChatList} initialParams={{route:route, navigation:navigation}} options={{headerShown:false}}/>
          <Stack.Screen name = 'ChatRoom' component={SelectedChat} options={{headerBackTitleVisible:false}}/>
      </Stack.Navigator>
  )
}

