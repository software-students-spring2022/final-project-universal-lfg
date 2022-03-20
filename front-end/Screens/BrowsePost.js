import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Post from '../Components/Post';
import theme from '../theme';

const POSTS = [
    {title: "Post1", detail: "detail1"},
    {title: "Post2", detail: "detail2"},
    {title: "Post3", detail: "detail3"}
    
]

export default function BrowsePost(){
    
    return (
        <View>
            <BackButton goBack={navigation.goBack} theme={theme} />
            <ScrollView>
            {
                POSTS.map((post) => { 
                    return(
                        <Post title={post.title} detail={post.detail}/>
                    )
                } )
            }
            </ScrollView>
        </View>
    )
}