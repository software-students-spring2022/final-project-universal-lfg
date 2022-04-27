import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Channel, Chat, ChannelList, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider } from 'stream-chat-expo';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DeepPartial, Theme } from 'stream-chat-expo';
const API_KEY = 'fgmh55s8ehws'

//Instance of chat client 
const chatClient = StreamChat.getInstance(API_KEY);

export default function ChatRoom() {
  const [ready, setReady] = useState(false);
  const [channel, setChannel] = useState();
  useEffect(() => {
    const connectChat = async () => {
      await chatClient.connectUser({
        id:'tstephen22', 
        name: 'Theo'}, 
        chatClient.devToken('tstephen22'));
      setReady(true);
    };
    connectChat();
  }, []);

  if (!ready) {
    return null;
  }
  console.log(ready)
  return (
    <SafeAreaProvider>
      <ChatOverlayProvider topInset={0}>
        <Chat client={chatClient}>
        {channel ? (
          <Channel channel={channel} >
            <MessageList />
            <MessageInput />
          </Channel>
        ) : (
          <ChannelList onSelect={setChannel} />
        )}
        </Chat>
    </ChatOverlayProvider>
    </SafeAreaProvider>
  );
}

