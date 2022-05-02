import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, Avatar, Icon} from 'react-native-elements';
import { useChatContext } from 'stream-chat-expo';
import theme from '../theme';

export default function Post(props){
    const onViewPressed = () => {
        props.navigation.navigate('ViewPost', {game: props.game, title: props.title, name: props.name, image: props.image, rank: props.rank, mode: props.mode, body: props.body, lobbyId: props.lobbyId, limit: props.limit})
    }
    const onEditPressed = () => {
        props.navigation.navigate('HostViewPost', {game: props.game, title: props.title, name: props.name, image: props.image, rank: props.rank, mode: props.mode, body: props.body, lobbyId: props.lobbyId, limit: props.limit})
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
        <TouchableOpacity onPress={ props.type === 'view' ? onViewPressed : onEditPressed}>
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
                <Text style={styles.text}>Mode: {props.mode}</Text>
                <Card.Divider/>
                <Text style={{marginBottom: 10}}>
                    {props.body}
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