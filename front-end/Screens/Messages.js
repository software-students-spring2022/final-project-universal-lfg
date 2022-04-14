import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import theme from "../theme";
import MessageCard from '../Components/MessageCard';

export default function Messages(props){ 

    const getMessages = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/messages', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
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
            <MessageCard title='Team Number 1' content='User said: Some message here'></MessageCard>
            <MessageCard title='Team Number 2' content='User said: Insert stuff here'></MessageCard>
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