import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements'
import theme from '../theme';

export default function BrowsePost(props){
    const onViewPressed = () => {
        console.log("Pressed")
    }

    return (
        <Card>
            <Card.Title>{props.title}</Card.Title>
            <Card.Divider/>
            <Card.Image source={props.image} />
            <Text style={{marginBottom: 10}}>
                {props.detail}
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
            >
                <Text>View Detail</Text>
            </TouchableOpacity>
        </Card>
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
      backgroundColor: "#DDDDDD",
      padding: 10
    },
    countContainer: {
      alignItems: "center",
      padding: 10
    }
  });