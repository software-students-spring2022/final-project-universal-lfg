import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Card, ListItem, Button,  Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Post from '../Components/Post';
import theme from '../theme';  
const POSTS = [
    {title: "Post1", detail: "detail1"},
    {title: "Post2", detail: "detail2"},
    {title: "Post3", detail: "detail3"}
    
]

export default function BrowsePost({route, navigation}){
    const { gameTitle } = route.params
    return (
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
                        {
                            POSTS.map((post) => { 
                                return(
                                    <Post key={post.title} title={post.title} detail={post.detail}/>
                                )
                            } )
                        }
                    </View>
            </View>
        </ScrollView>
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