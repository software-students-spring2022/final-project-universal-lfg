import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert, Text, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../Components/BackButton'
import theme from '../theme.js'
import AppButton from '../Components/AppButton'
import URL from '../url.json'
import { Icon } from 'react-native-elements';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loginPressed, setLoginPressed] = useState(false)
  const onLoginPressed = () => {
    if(loginPressed == false) { //To prevent multiple calls if the user keeps pressing login
      setLoginPressed(true)
      loginCall();
    } else console.log('Login pressed; waiting on response from server until allowing repress.')
  }

  const loginCall = async () => { 
    try {
      const user = {"email": email.value, "password": password.value}
      const res = await fetch(URL.url+'/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const response = await res.json()
      if (response.error) {
        setLoginPressed(false)
        Alert.alert(response.error)
      } else {
        await AsyncStorage.setItem("token", response.token)
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }]
        })
        setLoginPressed(false)
      }
    } catch (err) { 
        setLoginPressed(false)
        console.log(err)
    }
}

  return (
    <View style={styles.container}>
      <Icon name='chevron-back-circle' type="ionicon" size={40} color={theme.colors.primary} containerStyle={styles.back} onPress={() => navigation.navigate("StartScreen")} />
      <Text style={styles.header}>Welcome back.</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email.value}
        returnKeyType="next"
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <AppButton
          title='Log In'
          onPress={onLoginPressed}
      />
      <View style={styles.row}>
        <Text style={{color: theme.colors.text}}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
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
    back: {
      position: 'absolute',
      left: 20,
      top: 30
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.primary,
    },
    header: {
      fontSize: 20,
      color: theme.colors.primary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    input: {
      height: 40,
      width: "70%",
      borderWidth: 1,
      margin: 12,
      padding: 10,
      alignItems: "center",
      backgroundColor: '#ffffff'
    }
})