import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Channel, Chat, ChannelList, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider, useChatContext } from 'stream-chat-expo';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar, Button, BottomSheet, Icon, ListItem } from 'react-native-elements'
import { CommonActions } from '@react-navigation/native';
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
    const {lobbyId, navigation} = props
    const {client} = useChatContext()
    const channel = client.channel('messaging',lobbyId)
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
    if(!isReady) return null;
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
            <Button onPress={() => {
                leaveLobby(client, channel)
                .then(() => {
                    navigation.goBack();
                })}} 
                title = "LEAVE"
                buttonStyle={{backgroundColor: 'crimson', alignSelf:'flex-end'}}
            />
        </ScrollView>
    )
}
//--------------------------------------HELPER-------------------------------------------------------------
function leaveLobby(client, channel){
    return new Promise(async (resolve, reject) =>{
        try {
            await channel.removeMembers([client.user.id], {text:`${client.user.name} has left the lobby.`})
            await channel.stopWatching()
            console.log(`${client.user.name} leaving channel.` )
            resolve()
        } catch (e) {
            reject(e);
        }
    })
}
//-----------------------------------STYLES----------------------------------------------------------------
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
    },
    leaveLobby:{
        height: 20,
        color: 'red'
    }

})