import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Channel, Chat, ChannelList, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider, useChatContext } from 'stream-chat-expo';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar, Button, BottomSheet, Icon, ListItem } from 'react-native-elements'

function Member(props){
    const {image, name, online} = props
    console.log(props)
    console.log(name)
    if(online){
        return(
            <View style={styles.memberOnline}>  
            <Avatar
                size="small"
                rounded
                source={image}
                containerStyle={{marginLeft:10, backgroundColor:'lightgrey'}}
                title={name[0]}
                />
            <Text style={styles.memberTextOnline}>
                {name}
            </Text>
            </View>
        )
    } else {
        return(
            <View style={styles.memberOffline}>  
            <View style={styles.offline}>
            <Avatar
                size="small"
                rounded
                source={image}
                containerStyle={{marginLeft:10, backgroundColor: 'lightgrey', opacity: 0.7}}
                title={name[0]}
                />
            </View>
            <Text style={styles.memberTextOffline}>
                {name}
            </Text>
            </View>
        )
    }
}

export default function ChatSettings(props){
    const {lobbyId} = props
    const {client} = useChatContext()
    const [isReady, setReady] = useState(false)
    const [chatState, setChatState] = useState()
    const [onlineUsers, setOnlineUsers] = useState()
    const [offlineUsers, setOfflineUsers] = useState()
    console.log(lobbyId)
    useEffect(() =>{
        client.queryChannels({id:lobbyId}, {}, {}).then((res) =>{
            const state = res[0].state
            const {members} = state 
            let onlineMembers = []
            let offlineMembers = []
            for(let member in members){
                if(members[member].user.online === true) onlineMembers.push(members[member])
                else offlineMembers.push(members[member])
            }
            setOnlineUsers(onlineMembers)
            setOfflineUsers(offlineMembers)
            setChatState(state)
            setReady(true)
        }).catch((err) => console.log(err))
    }, [])
    if(isReady !== true) return null;
    return(
        <ScrollView>
            <Text style={styles.header}>ONLINE - {onlineUsers.length}</Text>
            <View>
            {
                onlineUsers.map((user) => <Member key={user.id} name={user.user.name} online={true} />)   
            }
            </View>
            <Text style={styles.header}>OFFLINE - {offlineUsers.length}</Text>
            <View>
            {
                offlineUsers.map((user) => <Member key={user.id} name={user.user.name} online={false} />)   
            }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    memberOnline:{
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        paddingLeft:10
    },
    memberTextOnline:{
        marginLeft: 20,
        fontSize: 15,
        color: 'white'
    },
    memberOffline:{
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        paddingLeft:10
    },
    memberTextOffline:{
        marginLeft: 20,
        fontSize: 15,
        color: 'white',
        opacity: 0.7
    },
    header:{
        color: 'white',
        fontSize: 13, 
        paddingLeft: 20,
        padding:10
    }

})