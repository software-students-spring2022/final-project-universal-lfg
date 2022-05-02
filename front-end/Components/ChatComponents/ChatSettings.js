import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Channel, Chat, ChannelList, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider, useChatContext } from 'stream-chat-expo';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar, Button, BottomSheet, Icon, ListItem } from 'react-native-elements'
import theme from '../../theme'
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../url.json'
function Member(props){
    const {image, name, online, owner} = props
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
            {owner ? <Icon name='crown' type="foundation" size={15} containerStyle={styles.owner} color={theme.colors.primary}/> : null}
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
            {owner ? <Icon name='crown' type="foundation" size={15} containerStyle={styles.ownerOffline} color={theme.colors.primary}/> : null}
            </View>
        )
    }
}

export default function ChatSettings(props){
    const {lobbyId, navigation, title} = props
    const {client} = useChatContext()
    const channel = client.channel('messaging',lobbyId)
    const [isReady, setReady] = useState(false)
    const [chatState, setChatState] = useState()
    const [onlineUsers, setOnlineUsers] = useState()
    const [offlineUsers, setOfflineUsers] = useState()
    const [owner, setOwner] = useState({id:'0'})
    useEffect(() =>{
        client.queryChannels({id:lobbyId}, {}, {}).then((res) =>{
            const state = res[0].state
            const {members} = state 
            let onlineMembers = []
            let offlineMembers = []
            for(let member in members){
                if(members[member].user.online === true) onlineMembers.push(members[member])
                else offlineMembers.push(members[member])
                if(members[member].role === 'owner') setOwner(members[member])
            }
            setOnlineUsers(onlineMembers)
            setOfflineUsers(offlineMembers)
            setChatState(state)
            setReady(true)
        }).catch((err) => console.log(err))
    }, [])
    if(!isReady) return null;
    return(
        <>
        <ScrollView>
            <Text style={styles.header}>ONLINE - {onlineUsers.length}</Text>
            <View>
            {
                onlineUsers.map((user) => <Member key={user.user.id} name={user.user.name} online={true} owner={owner.user.id === user.user.id} />)   
            }
            </View>
            <Text style={styles.header}>OFFLINE - {offlineUsers.length}</Text>
            <View>
            {
                offlineUsers.map((user) => <Member key={user.user.id} name={user.user.name} online={false} owner={owner.user.id === user.user.id}/>)   
            }
            </View>
        </ScrollView>
        {client.user.id === owner.user.id ? 
            <Button onPress={() => {
                deleteLobby(title, client, channel, navigation)}} 
                title = "DELETE LOBBY"
                buttonStyle={styles.deleteLobby}
            />
        :
            <Button onPress={() => {
                leaveLobby(client, channel)
                .then(() => {
                    navigation.goBack();
                })}} 
                title = "LEAVE"
                buttonStyle={styles.leaveLobby}
            />
        }
        </>
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
const deleteLobby = (title, client, channel, navigation) =>
    Alert.alert(
      "Delete Lobby",
      `Are you sure you want to delete lobby '${title}'?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => {
            leaveLobby(client, channel)
            .then(async () => {
                try {
                    const token = await AsyncStorage.getItem("token")
                    await fetch(url.url+'/delete-post', {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'x-access-token': token,
                            'id' : channel.id
                        },
                    });
                    console.log('Lobby deleted successfully')
                    channel.delete()
                    navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [
                            { name: 'Home', params: {func: (function () {
                                Alert.alert(
                                    "Lobby deleted.", '',
                                    [
                                        {
                                          text: "OK",
                                          style: "cancel",
                                        },
                                      ],
                                )
                             })()} 
                            },
                          ],
                        })
                      );
                } catch (error) {
                    console.error(error);
                } 
            })
        } }
      ]
    );
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
        height: 50,
        backgroundColor: 'crimson',
        marginBottom: 40
    },
    headerBar: {
        display: 'flex',
        flexDirection: 'column',
        height: 50,
        width: '100%'
    },
    owner:{
        marginLeft: 10
    },
    ownerOffline:{
        marginLeft: 10,
        opacity: 0.7
    },
    deleteLobby: {
        height: 50,
        backgroundColor: '#ffc40c',
        marginBottom: 40
    }
})