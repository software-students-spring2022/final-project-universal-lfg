import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput } from 'react-native';
import { Avatar, Button, BottomSheet, Icon, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import ProgressBar from '../Components/ProgressBar';
import theme from '../theme';
import BackButton from '../Components/BackButton';
import AppButton from '../Components/AppButton'
import { NavigationEvents } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../url.json'

export default function ViewPost({route, navigation}){
    const {gameTitle} = route.params

    //const [game, setGame] = useState({value: '', error: ''})
    const [title, setTitle] = useState({ value: '', error: '' })
    const [bodyText, setBodyText] = useState({ value: '', error: '' })
    const [gameMode, setGameMode] = useState({ value: '', error: '' })
    const [numPlayers, setNumPlayers] = useState({ value: '', error: '' })
    const [preferredRank, setPreferredRank] = useState({ value: '', error: '' })

    const [activeSpot, setActiveSpot] = useState(1);
    const totalSpots = 5;
    const onSubmitPressed = () => {
        createCall();

        //this is where you should navigate
        navigation.goBack();
    }

    const createCall = async ()  => {
        try {
            const post = {"game": gameTitle, "title": title.value, "numplayer": numPlayers.value, "mode": gameMode.value, "rank": preferredRank.value}
            const token = await AsyncStorage.getItem("token")
            const res = await fetch(URL.url+'/create', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
              },
              body: JSON.stringify(post)
            })
            const response = await res.json()
            if (response.error) {
              Alert.alert(response.error)
            } else {
              navigation.reset({
                index: 0,
                routes: [{ name: 'MyPosts' }],
              })
            }
          } catch (err) { 
            console.log(err)
          }
    }
    

    return (
        <View style={styles.container}>
            <BackButton goBack={navigation.goBack} theme={theme} />
            <TextInput
                style={styles.inputLine}
                placeholder="Title"
                value={title.value}
                returnKeyType="done"
                onChangeText={(text) => setTitle({ value: text, error: '' })}
            />
            <TextInput
                style={styles.inputBox}
                placeholder="Body"
                value={bodyText.value}
                returnKeyType="done"
                onChangeText={(text) => setBodyText({ value: text, error: '' })}
                multiline={true}
            />
            <TextInput
                style={styles.inputLine}
                placeholder="Game Mode"
                value={gameMode.value}
                returnKeyType="done"
                onChangeText={(text) => setGameMode({ value: text, error: '' })}
            />
            <TextInput
                style={styles.inputLine}
                placeholder="Number of Players"
                value={numPlayers.value}
                returnKeyType="done"
                onChangeText={(text) => setNumPlayers({ value: text, error: '' })}
            />
            <TextInput
                style={styles.inputLine}
                placeholder="Preferred Rank"
                value={preferredRank.value}
                returnKeyType="done"
                onChangeText={(text) => setPreferredRank({ value: text, error: '' })}
            />
            <AppButton
                title='Submit Post'
                onPress={onSubmitPressed}
                //onPress={navigation.goBack}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background, 
        height: "100%",
    },
    inputLine: {
        height: 40,
        width: "70%",
        borderWidth: 1,
        margin: 12,
        padding: 10,
        alignItems: "center",
        backgroundColor: '#ffffff'
    },
    inputBox: {
        height: 200,
        width: "70%",
        borderWidth: 1,
        margin: 12,
        padding: 10,
        alignItems: "center",
        backgroundColor: '#ffffff'
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
        marginBottom: 200,
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
    lobby: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: "center",
        marginTop: 50
    }
})