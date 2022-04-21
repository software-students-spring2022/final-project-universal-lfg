import React, { useEffect } from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import theme from "../theme";
import MessageCard from '../Components/MessageCard';
import URL from '../url.json'

const MESSAGES = (
    {from: "User 1", msg: "Here is a message"},
    {from: "User 2", msg: "Here is another message"}
)

export default function Messages(props){ 
    
    const getMessages = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            const response = await fetch(URL.url+'/messages', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token,
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
        getMessages();
      }, []);
    
    return ( 
        <View style={styles.container}> 
            <Text style={{color: theme.colors.primary, fontSize: 30, paddingBottom: 20}}>My Messages</Text> 
                <View>
                    {
                        MESSAGES.map((message) => { 
                            return(
                                <MessageCard from={message.from} msg={message.msg}/>
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
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
    }
})