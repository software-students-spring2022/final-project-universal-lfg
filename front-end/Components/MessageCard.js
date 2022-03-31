import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import theme from '../theme';

export default function MessageCard(props){
    const onViewPressed = () => {
        console.log("Pressed")
    }

    return (
        
        <TouchableOpacity
            style={styles.button}
            onPress={() => {onViewPressed()}}
            >   
                <Text style={styles.text}>{props.title}</Text>
                <Text style={styles.text}>{props.content}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 20,
      height: "50%",
      width: "70%"
    },
    button: {
        alignItems: "center",
        backgroundColor: theme.colors.button,
        height: '20%',
        width: "90%",
        padding: 5,
        borderColor: '#000000',
        borderWidth: 2
    },
    text: {
        paddingBottom: 20,
        fontFamily: 'Courier'
    },
  });