import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import theme from '../theme';

export default function BrowsePost(props){
    const onViewPressed = () => {
        console.log("Pressed")
    }
    
    return (
        <TouchableOpacity onPress={() => {props.navigation.navigate('ViewPost', 
        {game: props.game, title: props.title, name: props.name, initial: props.initial, image: props.image, rank: props.rank, detail: props.detail, lobbyId: props.lobbyId})}}>
            <Card>
                <Card.Title>{props.title}</Card.Title>
                <Card.Divider/>
                    <View style={{flexDirection: 'row'}}>
                        <Avatar
                            rounded
                            size="medium"
                            source={{uri: props.image}}
                            title = {props.name[0]}
                        />
                        <Text style={styles.text}>  {props.name}</Text>
                    </View>
                <Card.Divider/>
                <Text style={styles.text}>Rank: {props.rank}</Text>
                <Card.Divider/>
                <Text style={{marginBottom: 10}}>
                    {props.detail}
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {onViewPressed()}}
                >
                    <Text style={styles.text}>JOIN</Text>
                </TouchableOpacity>
            </Card>
        </TouchableOpacity> 
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    button: {
      alignItems: "center",
      backgroundColor: theme.colors.button,

      padding: 10
    },
    countContainer: {
      alignItems: "center",
      padding: 10
    },
    text: { 
        fontWeight: "bold",
        color: theme.text
    }
  });