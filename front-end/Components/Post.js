import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, Avatar, Icon} from 'react-native-elements';
import { useChatContext } from 'stream-chat-expo';
import theme from '../theme';
import { ScrollView } from 'react-native-gesture-handler';
import ProgressBar from '../Components/ProgressBar';

export default function BrowsePost(props){
    const onViewPressed = () => {
        console.log("Pressed")
    }
    const[ready, setReady] = useState(false)
    const[slots, setSlots] = useState(0)
    const {client} = useChatContext()
    useEffect(()=>{
        const channel = client.queryChannels({id:props.lobbyId}, {}, {})
        .then((res) =>{
            const state = res[0].state
            let membs = Object.keys(state.members).length
            setSlots(membs)
            setReady(true)
        })
    }, [])
    if(!ready) return null
    return (
        <TouchableOpacity onPress={() => {props.navigation.navigate(props.screen, 
        {game: props.game, title: props.title, name: props.name, initial: props.initial, image: props.image, rank: props.rank, detail: props.detail, lobbyId: props.lobbyId, limit: props.limit})}}>
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
                <View style={{flexDirection: 'row', marginHorizontal:15, marginVertical: 20}}>
                    <Icon type='feather' name={'users'} size={20} color='black'></Icon>
                    <Text style={{color: 'grey', fontSize: 15, marginLeft: 10}}>{slots} / {props.limit} </Text>
                </View>
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