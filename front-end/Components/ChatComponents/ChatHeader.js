import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Channel, useChatContext, Chat, ChannelList, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider } from 'stream-chat-expo';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DeepPartial, Theme } from 'stream-chat-expo';
import { Swipeable } from 'react-native-gesture-handler';
import { RectButton } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements'

export default function ChatSettings({}){
    const {channel} = useChatContext()


    return(
        <View>
            <View></View>
        </View>    
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row'
    }
})