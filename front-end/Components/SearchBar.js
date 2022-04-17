import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import Theme from '../theme';
const theme = Theme.colors
export default function Search({action}){
  const [text, changeText] = React.useState("");
  const [placeholder, onTouch] = useState('Search');
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={(newText) => {
            changeText(newText);
            action(newText)
        }}
        value={text}
        placeholder={placeholder}
        placeholderTextColor={'white'}
        onFocus={() => {onTouch('')}}
        onEndEditing={() => {onTouch('Search')}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
    backgroundColor: theme.background, 
    borderRadius: 5,
    borderColor: theme.primary,
    height: 50,
    borderWidth: 1,
    padding: 10,
    marginBottom: 5
  },
});