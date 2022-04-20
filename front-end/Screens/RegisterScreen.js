import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert, Text, TextInput } from 'react-native'
import BackButton from '../Components/BackButton'
import theme from '../theme.js'
import AppButton from '../Components/AppButton'
import URL from '../url.json'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    registerCall();
  }
  
  const registerCall = async () => {
    try {
      const user = {"name": name.value, "email": email.value, "password": password.value}
      const res = await fetch(URL.url+'/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const response = await res.json()
      if (response.error) {
        Alert.alert(response.error)
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
      }
    } catch (err) { 
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} theme={theme} />
      <Text style={styles.header}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        secureTextEntry
      />
      <AppButton
          title='Sign Up'
          onPress={onSignUpPressed}
      />
      <View style={styles.row}>
        <Text style={{color: theme.colors.text}}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background, 
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    header: {
      fontSize: 20,
      color: theme.colors.primary,
    },
    input: {
      height: 40,
      width: "70%",
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#ffffff'
    }
})