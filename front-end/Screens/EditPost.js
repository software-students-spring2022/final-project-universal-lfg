import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../theme.js'
import URL from '../url.json'

const windowWidth = Dimensions.get('window').width;

export default function EditPost({route, navigation}){
    const { postId, game, title, rank, mode, body, numplayer } = route.params

    const [newTitle, setNewTitle] = useState(title)
    const [newRank, setNewRank] = useState(rank)
    const [newMode, setNewMode] = useState(mode)
    const [newBody, setNewBody] = useState(body)
    const [newNumplayer, setNewNumplayer] = useState(numplayer)

    const onPress = () => {
        EditPost()
    }

    const EditPost = async () => { 
        try {
            const newpost = { "postId": postId, "title": newTitle, "rank": newRank, "mode": newMode, "body": newBody, "numplayer": newNumplayer }
            const token = await AsyncStorage.getItem("token")
            const res = await fetch(URL.url+'/editpost', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(newpost)
            })
            const response = await res.json()
            if (response.error) {
                Alert.alert(response.error)
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Home", params: {func: (function () {
                        Alert.alert("Lobby edited successfully.")})()}}]
                })
            }
        } catch (err) { 
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleBar}>
                <View>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <Icon type='antdesign' name={'left'} size={15} color={theme.colors.primary} style={theme.icon}></Icon>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Edit Post</Text>
                <TouchableOpacity style={styles.button} onPress={onPress} >
                    <Text style={{color: theme.colors.text, fontSize: 13}}>Confirm</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ color: '#bcbcbc', paddingLeft: 10 }}>Update title</Text>
                <TextInput
                    style={styles.input}
                    placeholder={title}
                    placeholderTextColor="#bcbcbc"
                    value={newTitle}
                    returnKeyType="next"
                    onChangeText={(text) => setNewTitle(text)}
                    autoCapitalize="none"
                />
                <Text style={{ color: '#bcbcbc', paddingLeft: 10 }}>Update rank</Text>
                <TextInput
                    style={styles.input}
                    placeholder={rank}
                    placeholderTextColor="#bcbcbc"
                    value={newRank}
                    returnKeyType="next"
                    onChangeText={(text) => setNewRank(text)}
                    autoCapitalize="none"
                />
                <Text style={{ color: '#bcbcbc', paddingLeft: 10 }}>Update mode</Text>
                <TextInput
                    style={styles.input}
                    placeholder={mode}
                    placeholderTextColor="#bcbcbc"
                    value={newMode}
                    returnKeyType="next"
                    onChangeText={(text) => setNewMode(text)}
                    autoCapitalize="none"
                />
                <Text style={{ color: '#bcbcbc', paddingLeft: 10 }}>Update body</Text>
                <TextInput
                    style={styles.bodyinput}
                    placeholder={body}
                    placeholderTextColor="#bcbcbc"
                    value={newBody}
                    multiline={true}
                    textAlignVertical="top"
                    onChangeText={(text) => setNewBody(text)}
                    autoCapitalize="none"
                />
                <Text style={{ color: '#bcbcbc', paddingLeft: 10 }}>Update number of players</Text>
                <TextInput
                    style={styles.input}
                    placeholder={numplayer}
                    placeholderTextColor="#bcbcbc"
                    value={newNumplayer}
                    keyboardType='numeric'
                    returnKeyType="next"
                    onChangeText={(text) => setNewNumplayer(text)}
                    autoCapitalize="none"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: '100%'
    },
    titleBar: {
        width: "100%",
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#191919',
        height: 60,
        marginBottom: 20
    },
    input: {
        height: 50,
        width: "100%",
        marginTop: 5,
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#333437',
        color: '#bcbcbc'
    },
    bodyinput: {
        height: 100,
        width: "100%",
        marginTop: 5,
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#333437',
        color: '#bcbcbc'
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        right: 10,
        height: 30,
        width: 80,
        borderRadius: 30,
        backgroundColor: '#444444'
    },
    title: { 
        width: 130,
        position: 'absolute',
        left: (windowWidth - 80)/2,
        color: theme.colors.text,
        fontSize: 18
    }
})