import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Theme from '../theme';


const theme = Theme.colors;

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hi</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.background, 
  },
  text: { 
      color: theme.text
  },
  gameIcon: { 
    backgroundColor: '#000000'
  }
});
