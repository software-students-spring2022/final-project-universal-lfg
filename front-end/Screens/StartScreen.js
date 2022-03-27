import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import theme from '../theme'

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome to Universal LFG!
      </Text>
      <Button
        style={styles.button}
        title='Log In'
        onPress={() => navigation.navigate('LoginScreen')}
      />
      <Button
      style={styles.button}
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
    },
    header: {
      color: theme.colors.primary,
      fontSize: 30,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'white',
    }
})