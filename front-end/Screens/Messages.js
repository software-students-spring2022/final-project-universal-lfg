import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import theme from "../theme";
import MessageCard from '../Components/MessageCard';

export default function Messages(props){ 
    return ( 
        <View style={styles.container}> 
            <Text style={{color: theme.colors.primary, fontSize: 30, paddingBottom: 20}}>My Messages</Text> 
            <MessageCard title='Team Number 1' content='User said: Some message here'></MessageCard>
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