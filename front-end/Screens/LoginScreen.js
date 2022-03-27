import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Button, Text, TextInput } from 'react-native'
import BackButton from '../Components/BackButton'
import theme from '../theme.js'
import { emailValidator } from '../Helpers/emailValidator'
import { passwordValidator } from '../Helpers/passwordValidator'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} theme={theme} />
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
      <Button onPress={onLoginPressed}
      title='Log In'
      />
      <View style={styles.row}>
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