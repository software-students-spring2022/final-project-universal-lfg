import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Channel, Chat, ChannelList, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider, setActiveChannel } from 'stream-chat-expo';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import ChatSettings from '../Components/ChatComponents/ChatSettings';
import theme from '.././theme'
const API_KEY = 'fgmh55s8ehws'
const windowWidth = Dimensions.get('window').width;
//Instance of chat client 
const chatClient = StreamChat.getInstance(API_KEY);
const SideMenu = createDrawerNavigator(); 

function ChatRoom({route, navigation}) {
  const headStackNav = route.params.navigation
  const { title, lobbyId } = route.params.lobbyParams
  const channel = chatClient.channel('messaging', lobbyId)
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
    <Swipeable>
        <Channel channel={channel} keyboardVerticalOffset={50}>
        <MessageList/>
        <MessageInput />
        <View style={{height:40, backgroundColor: 'white'}} />
        <View style={styles.header}>
          <Icon name='group' type='font-awesome' size={40} color={theme.colors.card} containerStyle={styles.menu} onPress={() => navigation.openDrawer()} />
          <View style={styles.headerTitle}>
            <Text style={styles.headText}>{title}</Text>
          </View>
           <Icon name='chevron-back-circle' type="ionicon" size={40} 
           color={theme.colors.card} containerStyle={styles.backButton} onPress={() => headStackNav.goBack()} />
        </View>
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
  header:{
    position:'absolute', 
    top:0, 
    right:0,
    width:'100%',
    height: 50,
    flexDirection:'column'
  },
  menu:{
    position: 'absolute',
    top:10,
    right:10, 
    height:50,
    width:50
  },
  backButton:{
    position: 'absolute',
    top:10,
    left:10, 
  },
  headerTitle:{
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 8,
    color: 'white',
    height: 25,
    backgroundColor: theme.colors.card,
    borderRadius: 15
  },
  headText:{
    color: 'white',
    textAlign: 'center', 
    maxWidth: '60%', 
    paddingHorizontal:20, 
  }
})
