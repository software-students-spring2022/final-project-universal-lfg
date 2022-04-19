
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Card, ListItem, Button,  Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from '../Components/Post';
import theme from '../theme';  
import AppButton from '../Components/AppButton';
import { Value } from 'react-native-reanimated';
import URL from '../url.json'

const POSTS = [
    {title: "Post1", name: "Name1", initial: "N1", image: require("../Images/AddIcon.png"), rank: "GOLD", detail: "detail1"},
    {title: "Post2", name: "Name2", initial: "N2", image: require("../Images/AddIcon.png"), rank: "GOLD", detail: "detail2"},
    {title: "Post3", name: "Name3", initial: "N3", image: require("../Images/AddIcon.png"), rank: "GOLD", detail: "detail3"}
]

export default function BrowsePost({route, navigation}){
    const { gameTitle } = route.params
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const getPosts = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            const response = await fetch(URL.url+'/browse', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            });
            const json = await response.json();
            setData(json.posts);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    const onCreatePressed = () => {
        console.log("Go to CreatePost")
        navigation.navigate('CreatePost', {parameter: Value, parameter: Value})
    }

    useEffect(() => {
        getPosts();
      }, []);
    

    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.titleBar}>
                        <View>
                            <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
                                <Icon type='antdesign' name={'left'} size={40} color={theme.colors.primary} style={theme.icon}></Icon>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.mygamesTitle}>{gameTitle}</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {onCreatePressed()}}
                            >
                                <Text style={styles.create}>Create Post</Text>
                             </TouchableOpacity>
                        </View>
                        <View>
                            {
                                POSTS.map((post) => { 
                                    return(
                                        <Post key={post.title} navigation={navigation} game={gameTitle} title={post.title} initial={post.initial} image={post.image} name={post.name} rank={post.rank} detail={post.detail}/>
                                    )
                                } )
                            }
                        </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 20,
    },
    titleBar: {
        width: "100%",
        fontSize: 35,
        flexDirection: 'row',
        alignItems: 'center',
        height:60
    },
    text: { 
        fontWeight: "bold",
        color: theme.text
    },
    create: { 
        fontWeight: "bold",
        color: theme.text,
        fontSize: 20
    },
    button: {
        alignItems: "center",
        backgroundColor: theme.colors.button,
        marginHorizontal: 15,
        padding: 15,
      },
    mygamesTitle: { 
        color: theme.colors.text,
        fontSize: 35,
        fontWeight: "bold", 
        paddingLeft: 12
      },
      backButton: { 
        paddingLeft:13
        
      }
})