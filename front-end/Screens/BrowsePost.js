
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
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                    'Game': gameTitle
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
                                data.map((post, indx) => { 
                                    return(
                                        (post.user === undefined ? <></>: <Post key={post.title+indx} navigation={navigation} game={gameTitle} title={post.title} image={post.user.img} name={post.user.username} rank={post.rank}/>)
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