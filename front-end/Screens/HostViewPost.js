import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, LogBox, Alert } from 'react-native';
import { Avatar, Button, BottomSheet, Icon, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from '../Components/ProgressBar';
import { useChatContext } from 'stream-chat-expo';
import { CommonActions } from '@react-navigation/native';
import theme from '../theme';
import ChatRoom from './ChatRoom';
import URL from '../url.json'

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
])
const Stack = createStackNavigator()

function HostViewPost({route, navigation}){
    //Getting the user 
    const {client} = useChatContext()
    //States 
    const [chatState, setChatState] = useState();
    const [activeSpot, setActiveSpot] = useState(0);
    const [joined, setJoined] = useState(false);
    //Getting params
    const { game, title, name, image, rank, mode, body, lobbyId, limit, goBack } = route.params.route.params // This is because it passes through the stack screen first    
    const limitNum = parseInt(limit)
    //Getting the chat room associated with the post 
    useFocusEffect(() => {
        client.queryChannels({id:lobbyId}, {}, {}).then((res) =>{
        const state = res[0].state
        const memberNum = Object.keys(state.members).length
        setChatState(state)
        setActiveSpot(memberNum+1)

        if(state.members[client.user.id] !== undefined) setJoined(true)
        else setJoined(false)
    }).catch((err) => console.log(err))
    })   
    const lobbyParams = route.params.route.params //For passing down to chat room etc 

    const [isVisible, setIsVisible] = useState(false);
    const list = [
        { 
            title: '',
            icon: 'cross',
            type: 'entypo',
            onPress: () => setIsVisible(false)
        },
        {
            title: 'Edit Post',
            icon: 'edit',
            type: 'antdesign',
            onPress: () => navigation.navigate('EditPost', {postId: lobbyId, game: game, title: title, rank: rank, mode: mode, body: body, numplayer: limit}) /* Navigate to Edit Page*/
        }
    ];

    if(chatState === undefined) return null;
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <TouchableOpacity onPress={goBack || navigation.goBack} style={styles.backButton}>
                        <Icon type='antdesign' name={'left'} size={30} color={'#d9d9d9'}></Icon>
                    </TouchableOpacity>
                    <Avatar
                        size="small"
                        rounded
                        source={{uri: image}}
                        // title={initial}
                        containerStyle={{backgroundColor: 'lightgrey'}}
                    />
                    <Text style={{color: 'white', textAlign: 'left', marginLeft: 10, fontSize:16}}> {name}{"\n "}<Text style={{color: '#d9d9d9', fontSize:12}}>{game}</Text></Text>
                    <Icon type='entypo' name={'dots-three-vertical'} size={25} color={'#d9d9d9'} containerStyle={{position: 'absolute', right: 20}} onPress={() => setIsVisible(true) }></Icon>
                </View>
                <BottomSheet
                        isVisible = {isVisible}
                        modalProps={{}}>
                    {
                        list.map((item, i) => (
                            <ListItem key={i} containerStyle={{ backgroundColor: '#111111' }} onPress={item.onPress}>
                                <Icon name={item.icon} type={item.type} color='white'/>
                                <ListItem.Content>
                                    <ListItem.Title style={{color: 'white'}}>
                                        <Text>{item.title}</Text>
                                    </ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        ))
                    }
                </BottomSheet>
                <ScrollView style={styles.content}>
                    <View style={styles.title}>
                        <Text style={{fontWeight: 'bold', fontSize: 20, color: theme.colors.text}}>{title}</Text>
                    </View>
                    <Icon type='material' name={'computer'} size={20} color='black' containerStyle={styles.icon}></Icon>
                    <Text style={{color: 'lightgrey'}}>Rank: {rank}</Text>
                    <Text style={{color: 'lightgrey'}}>Mode: {mode}</Text>
                    <Text style={styles.detail}>{body}</Text>
                </ScrollView>

                <View style={{width: "100%", position:'absolute', bottom: 130}}>
                    <View style={{ marginHorizontal:15, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <ScrollView horizontal>
                            <ProgressBar key={title} activeSpot={activeSpot} totalSpots={limitNum} />
                        </ScrollView>
                    </View>

                    <View style={{flexDirection: 'row', marginHorizontal:15, marginVertical: 20}}>
                        <Icon type='feather' name={'users'} size={20} color='grey'></Icon>
                        <Text style={{color: '#ECECEC', fontSize: 15, marginLeft: 10}}>{activeSpot-1} in Lobby</Text>
                    </View>
                    {joined === true ? 
                        <Button 
                        onPress={() => navigation.navigate('ChatRoomPost', {lobbyParams:lobbyParams})} // Navigate to chat page
                        title = "VIEW LOBBY"
                        buttonStyle={{backgroundColor: theme.colors.card}}
                        />
                        :(chatState.watcher_count === limitNum ? 
                        <Button 
                        onPress={() => console.log("Lobby is full.")} // Navigate to chat page
                        title = "FULL LOBBY"
                        buttonStyle={{backgroundColor: 'grey'}}
                        />:
                        <Button 
                        onPress={() => {
                            const channel = client.channel('messaging', lobbyId)
                            channel.addMembers([client.user.id], {text:`${client.user.name} has joined the lobby -- Say Hi!`})
                            navigation.navigate('ChatRoomPost', {lobbyParams:lobbyParams})
                            setJoined(true)
                            setActiveSpot(activeSpot+1)
                        }}// Navigate to chat page
                        title = "JOIN LOBBY"
                        buttonStyle={{backgroundColor: theme.colors.button}}
                        />)
                    }
                </View>
                
            </View>
        </SafeAreaProvider>
    )
}

export default function PostStack({route, navigation}){
    return(
        <Stack.Navigator screenOptions={{initialRouteName: "HostViewLobby"}}>
            <Stack.Screen name = 'HostViewLobby' component={HostViewPost} initialParams={{route:route, navigation:navigation}} options={{headerShown:false}}/>
            <Stack.Screen name = 'ChatRoomPost' component={ChatRoom} options={{headerBackTitleVisible:false, headerShown:false}}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 5,
    },
    titleBar: {
        width: "100%",
        flexDirection: 'row',
        height:70,
        backgroundColor: '#111111',
        alignItems: "center",
        shadowColor: "#a5a5a5",
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        
        elevation: 20
    },
    backButton: { 
        marginHorizontal: 15
    },
    content: {
        marginHorizontal: 15,
        marginVertical: 15,
        height: "100%"
    },
    title: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingBottom: 8,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.7
    },
    icon: {
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: theme.colors.primary,
        marginBottom:10
    },
    detail: {
        marginTop: 20,
        marginBottom: 250,
        color: theme.colors.text
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: theme.colors.button,
        color: 'white'
    }
})