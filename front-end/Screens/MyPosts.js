import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import theme from "../theme";

export default function MyPosts(props){ 
    return ( 
        <View style={styles.container}> 
            <Text style={{color: theme.colors.card, fontSize: 15}}>This is the My Posts page.</Text> 
        </View>
    ); 
}

const styles = StyleSheet.create({ 
    container: { 
        backgroundColor: theme.colors.background, 
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})