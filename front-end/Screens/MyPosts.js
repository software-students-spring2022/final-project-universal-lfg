import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useChatContext } from 'stream-chat-expo';
import Post from '../Components/Post';
import theme from "../theme";
import URL from '../url.json'

export default function MyPosts({navigation}){
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const getMyPosts = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            const response = await fetch(URL.url+'/myposts', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
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

    useEffect(() => {
        getMyPosts();
    }, []);

    return ( 
        <View style={styles.container}> 
            <View>
                {
                    data.map((post) => {
                        return(
                            <Post key={post._id.toString()} navigation={navigation} game={post.game} title={post.title} 
                                           image={post.user.img} name={post.user.username} rank={post.rank} mode={post.mode} body={post.body} 
                                           lobbyId={post._id.toString()} limit={post.numplayer} type='edit'/>
                        )
                    } )
                }
            </View>
        </View>
    ); 
}

const styles = StyleSheet.create({ 
    container: { 
        backgroundColor: theme.colors.background, 
        height: '100%'
    }
})