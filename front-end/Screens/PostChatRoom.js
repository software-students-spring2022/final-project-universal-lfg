import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Channel, Chat, ChannelList, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider } from 'stream-chat-expo';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DeepPartial, Theme } from 'stream-chat-expo';

const API_KEY = 'fgmh55s8ehws'

//Instance of chat client 
const chatClient = StreamChat.getInstance(API_KEY);

export default function ChatRoom({route, navigation}) {
  const { game, title, name, initial, image, rank, detail } = route.params.lobbyParams
  let channelID = title.replace(/\s/g, '') + '_' + name + '_' + rank
  const channel = chatClient.channel('messaging', channelID)
  const [ready, setReady] = useState(false)
  useEffect(() =>{
      async function connectUser(){
          await channel.watch()
          setReady(true)
      }
      connectUser()
  }, [])

  if(!ready) return null
  return (
    <SafeAreaProvider>
        <Channel channel={channel} keyboardVerticalOffset={0}>
            <MessageList />
            <MessageInput />
        </Channel>
    </SafeAreaProvider>
  );
}

