import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import theme from '../theme'

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{color: theme.colors.text}}>
        Welcome to Universal LFG!
      </Text>
      <Button
        title='Log In'
        onPress={() => navigation.navigate('LoginScreen')}
      />
      <Button
        title='Sign Up'
        onPress={() => navigation.navigate('RegisterScreen')}
      />
    </View>

  )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background, 
    }
})