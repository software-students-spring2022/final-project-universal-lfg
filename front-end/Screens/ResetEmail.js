import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../theme.js'
import URL from '../url.json'

const windowWidth = Dimensions.get('window').width;

export default function ResetEmail({navigation}){
    const [newEmail, setNewEmail] = useState('')

    const onPress = () => {
        resetEmail()
    }

    const resetEmail= async () => { 
        try {
          const email = { "email": newEmail }
          const token = await AsyncStorage.getItem("token")
          const res = await fetch(URL.url+'/resetEmail', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token
            },
            body: JSON.stringify(email)
          })
          const response = await res.json()
          if (response.error) {
            Alert.alert(response.error)
          } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
            })
          }
        } catch (err) { 
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleBar}>
                <View>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <Icon type='antdesign' name={'left'} size={15} color={theme.colors.primary} style={theme.icon}></Icon>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Edit Email</Text>
                <TouchableOpacity style={styles.button} onPress={onPress} >
                    <Text style={{color: theme.colors.text, fontSize: 13}}>Confirm</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ color: '#bcbcbc', paddingLeft: 10 }}>Enter your new email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter New Email"
                    placeholderTextColor="#bcbcbc"
                    value={newEmail}
                    returnKeyType="next"
                    onChangeText={(text) => setNewEmail(text)}
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: '100%'
    },
    titleBar: {
        width: "100%",
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#191919',
        height: 60,
        marginBottom: 20
    },
    input: {
        height: 50,
        width: "100%",
        marginTop: 5,
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#333437',
        color: '#bcbcbc'
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        right: 10,
        height: 30,
        width: 80,
        borderRadius: 30,
        backgroundColor: '#444444'
    },
    title: { 
        width: 120,
        position: 'absolute',
        left: (windowWidth - 130)/2,
        color: theme.colors.text,
        fontSize: 18
    }
})