import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../theme.js'
import URL from '../url.json'

const windowWidth = Dimensions.get('window').width;

export default function ResetPassword({navigation}){
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onPress = () => {
        if (!oldPassword) {
            Alert.alert("All fields are required")
        } else if (newPassword !== confirmPassword) {
            Alert.alert("New password and confirmation password do not match")
        } else if (newPassword === oldPassword) {
            Alert.alert("New password should be different from the old one")
        } else {
            resetPassword()
        }
    }

    const resetPassword = async () => { 
        try {
          const password = {"oldPassword": oldPassword, "newPassword": newPassword}
          const token = await AsyncStorage.getItem("token")
          const res = await fetch(URL.url+'/resetPassword', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token
            },
            body: JSON.stringify(password)
          })
          const response = await res.json()
          if (response.error) {
            Alert.alert(response.error)
          } else {
            navigation.navigate('ConfirmScreen')
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
                <Text style={styles.title}>Edit Password</Text>
                <TouchableOpacity style={styles.button} onPress={onPress} >
                    <Text style={{color: theme.colors.text, fontSize: 13}}>Confirm</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ color: '#bcbcbc', paddingLeft: 10 }}>Current Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Current Password"
                    placeholderTextColor="#bcbcbc"
                    value={oldPassword}
                    returnKeyType="next"
                    onChangeText={(text) => setOldPassword(text)}
                    autoCapitalize="none"
                />
            </View>
            <View>
                <Text style={{ color: '#bcbcbc', paddingLeft: 10 }}>New Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter New Password"
                    placeholderTextColor="#bcbcbc"
                    value={newPassword}
                    returnKeyType="next"
                    onChangeText={(text) => setNewPassword(text)}
                    autoCapitalize="none"
                />
            </View>
            <View>
                <Text style={{ color: '#bcbcbc', paddingLeft: 10 }}>Confirm New Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter New Password Again"
                    placeholderTextColor="#bcbcbc"
                    value={confirmPassword}
                    returnKeyType="done"
                    onChangeText={(text) => setConfirmPassword(text)}
                    autoCapitalize="none"
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
        width: 130,
        position: 'absolute',
        left: (windowWidth - 130)/2,
        color: theme.colors.text,
        fontSize: 18
    }
})