import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import theme from '../theme'
import AppButton from '../Components/AppButton';

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome to Universal LFG!
      </Text>
      <AppButton
          title='Log In'
          onPress={() => navigation.navigate('LoginScreen')}
      />
      <AppButton
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
    }
})