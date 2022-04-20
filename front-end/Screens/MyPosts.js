import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import theme from "../theme";

const POSTS = [
    {game: 'League of Legends', title: "MyPost1", name: "John Doe", initial: "JD", image: require("../assets/profilepic.png"), rank: "GOLD", detail: "detail1"},
    {game: 'Minecraft', title: "MyPost2", name: "John Doe", initial: "JD", image: require("../assets/profilepic.png"), rank: "Beginner", detail: "detail2"},
]

export default function MyPosts({navigation}){ 
    return ( 
        <View style={styles.container}> 
            <View>
                {
                    POSTS.map((post) => { 
                        return(
                            <TouchableOpacity key={post.title} onPress={() => {navigation.navigate('HostViewPost', {game: post.game, title: post.title, name: post.name, initial: post.initial, image: post.image, rank: post.rank, detail: post.detail})}}>
                                <Card containerStyle={{marginHorizontal: 10}}>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Divider/>
                                    <Text style={{color: 'grey'}}>
                                        {post.game}    
                                    </Text>
                                    <Text style={{marginVertical: 10}}>
                                        {post.detail}
                                    </Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <Avatar
                                            size="small"
                                            rounded
                                            source={post.image}
                                            containerStyle={{backgroundColor: 'lightgrey'}}
                                        />
                                        <Text style={{color: 'grey', textAlign: 'left', fontSize:14, textAlignVertical: 'center'}}> {post.name} </Text>
                                    </View>
                                </Card>
                            </TouchableOpacity> 
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