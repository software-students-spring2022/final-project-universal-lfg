import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput } from 'react-native';
import { Avatar, Button, BottomSheet, Icon, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import ProgressBar from '../Components/ProgressBar';
import theme from '../theme';
import BackButton from '../Components/BackButton';
import AppButton from '../Components/AppButton'
import { NavigationEvents } from 'react-navigation';

export default function ViewPost({route, navigation}){
    const { game, name, initial, image, rank, detail } = route.params

    const [title, setTitle] = useState({ value: '', error: '' })
    const [bodyText, setBodyText] = useState({ value: '', error: '' })
    const [gameMode, setGameMode] = useState({ value: '', error: '' })
    const [numPlayers, setNumPlayers] = useState({ value: '', error: '' })
    const [preferredRank, setPreferredRank] = useState({ value: '', error: '' })

    const [activeSpot, setActiveSpot] = useState(1);
    const totalSpots = 5;
    const onSubmitPressed = () => {
        if (activeSpot <= totalSpots) {
            console.log("One Player Joined the Team");
            setActiveSpot(prev => prev + 1);
        } else {
            console.log("The Team is Full")
        }
    }

    return (
        <View style={styles.container}>
            <BackButton goBack={navigation.goBack} theme={theme} />
            <TextInput
                style={styles.inputLine}
                placeholder="Title"
                value={title.value}
                returnKeyType="done"
                onChangeText={(text) => setTitle({ value: text, error: '' })}
            />
            <TextInput
                style={styles.inputBox}
                placeholder="Body"
                value={bodyText.value}
                returnKeyType="done"
                onChangeText={(text) => setBodyText({ value: text, error: '' })}
                multiline={true}
            />
        </View>
    )
}