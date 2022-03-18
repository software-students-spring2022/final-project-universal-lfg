import React from 'react'
import Button from './Components/Button.js'
import theme from '../theme.js'

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>
        Welcome to Universal LFG!
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </View>

  )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.background, 
    }
})