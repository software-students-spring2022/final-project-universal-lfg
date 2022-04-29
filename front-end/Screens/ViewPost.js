import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, LogBox } from 'react-native';
import { Avatar, Button, BottomSheet, Icon, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProgressBar from '../Components/ProgressBar';
import { useChatContext } from 'stream-chat-expo';
import theme from '../theme';
import ChatRoom from './ChatRoom';
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
])
const Stack = createStackNavigator()
function ViewPost({route, navigation}){
    //States 
    const [chatState, setChatState] = useState()
    const [activeSpot, setActiveSpot] = useState(0);
    //Getting params
    const { game, title, name, initial, image, rank, detail, lobbyId, limit } = route.params.route.params // This is because it passes through the stack screen first
    const limitNum = parseInt(limit)
    //Getting the chat room associated with the post 
    const {client} = useChatContext()
    client.queryChannels({id:lobbyId}, {}, {}).then((res) =>{
        const state = res[0].state
        setChatState(state)
        setActiveSpot(state.watcher_count+1)
        console.log("watcher: " + state.watcher_count + " limit: " + limit)
    }).catch((err) => console.log(err))
    const lobbyParams = route.params.route.params //For passing down to chat room etc
    const onPress = () => {
        if (activeSpot <= totalSpots) {
            console.log("One Player Joined the Team");
            setActiveSpot(prev => prev + 1);
        } else {
            console.log("The Team is Full")
        }
    }

    
    const [isVisible, setIsVisible] = useState(false);
    const list = [
        { 
            title: '',
            icon: 'cross',
            type: 'entypo',
            onPress: () => setIsVisible(false)
        },
        { 
            title: 'Report Post',
            icon: 'warning',
            type: 'antdesign',
            onPress: () => console.log("Post Reported")
        }
    ];

    if(chatState === undefined) return null;
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
                        <Icon type='antdesign' name={'left'} size={30} color={'#d9d9d9'}></Icon>
                    </TouchableOpacity>
                    <Avatar
                        size="small"
                        rounded
                        source={image}
                        // title={initial}
                        containerStyle={{backgroundColor: 'lightgrey'}}
                        title={name[0]}
                    />
                    <Text style={{color: '#d9d9d9', textAlign: 'left', marginLeft: 20, fontSize:12}}> {name}{"\n"}{game} </Text>
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
                        <Text style={{fontWeight: 'bold', fontSize: 20, color: theme.colors.text,}}>{title}</Text>
                        {/* <TouchableOpacity onPress={() => setIsVisible(true)} style={{justifyContent: "flex-end"}}>
                            // Navigate to  Edit Page
                            <Icon type='antdesign' name={'edit'} size={25} color={'#d9d9d9'} onPress={() => console.log('Edit Post')}></Icon>
                        </TouchableOpacity> */}
                    </View>
                    <Icon type='material' name={'computer'} size={20} color='black' containerStyle={styles.icon}></Icon>
                    <Text style={{color: 'lightgrey'}}>Rank: {rank}</Text>
                    <Text style={styles.detail}>{detail}</Text>
                </ScrollView>
                <View style={{ marginHorizontal:15, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ScrollView horizontal>
                        <ProgressBar key={title} activeSpot={activeSpot} totalSpots={limitNum} />
                    </ScrollView>
                </View>
                <View style={{flexDirection: 'row', marginHorizontal:15, marginVertical: 20}}>
                    <Icon type='feather' name={'users'} size={20} color='grey'></Icon>
                    <Text style={{color: '#ECECEC', fontSize: 15, marginLeft: 10}}>{chatState.watcher_count} Active in Chat Room</Text>
                </View>
                {chatState.watcher_count === limitNum ? 
                    <Button 
                    onPress={() => console.log("Lobby is full.")} // Navigate to chat page
                    title = "FULL LOBBY"
                    buttonStyle={{backgroundColor: 'grey'}}
                    />:
                    <Button 
                    onPress={() => {
                        navigation.navigate('ChatRoomPost', {lobbyParams:lobbyParams})
                        setActiveSpot(activeSpot+1)
                        }}// Navigate to chat page
                    title = "JOIN LOBBY"
                    buttonStyle={{backgroundColor: theme.colors.button}}
                    />
                }
            </View>
        </SafeAreaProvider>
    )
}

export default function PostStack({route, navigation}){
    console.log(route.params)
    return(
        <Stack.Navigator screenOptions={{initialRouteName: "ViewLobby"}}>
            <Stack.Screen name = 'ViewLobby' component={ViewPost} initialParams={{route:route, navigation:navigation}} options={{headerShown:false}}/>
            <Stack.Screen name = 'ChatRoomPost' component={ChatRoom} options={{headerBackTitleVisible:false}}/>
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
        marginVertical: 15
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
    },
    chatHeader:{

    }
})