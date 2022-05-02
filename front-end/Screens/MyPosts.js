import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import {useChatContext} from 'stream-chat-expo'
import theme from "../theme";
import url from '../url.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from '../Components/Post'

export default function MyPosts({navigation}){ 
    const {client} = useChatContext();
    const [POSTS, setPosts] = useState()
    const [isLoading, setLoading] = useState(true)
    const getPosts = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            const response = await fetch(url.url+'/viewposts', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                },
            });
            const json = await response.json();
            console.log(json)
            setPosts(json.posts)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() =>{
        getPosts()
    }, [])
    if(isLoading) return null;
    return ( 
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={getPosts} />
          }> 
            <View>
            <Text style={styles.myPostsTitle}>My Posts</Text>
                {
                    POSTS.map((post) => {
                        return(
                            (post.user === undefined ? <></>
                            : <Post key={post._id.toString()} navigation={navigation} game={post.game} title={post.title} 
                                image={post.user.img} name={client.user.name} rank={post.rank} mode={post.mode} body={post.body}
                                lobbyId={post._id.toString()} limit={post.numplayer} screen={'HostViewPost'}/>)
                        )
                    } )
                }
            </View>
        </ScrollView>
    ); 
}

const styles = StyleSheet.create({ 
    container: { 
        backgroundColor: theme.colors.background, 
        height: '100%'
    },
    myPostsTitle: { 
        color: theme.colors.text,
        fontSize: 35,
        fontWeight: "bold",
        paddingTop:20,
        paddingBottom: 5,
        paddingLeft: 13
      }, 
})