import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Icon } from 'react-native-elements';

export default function BackButton({ goBack, theme }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Icon type='antdesign' name={'leftcircle'} size={35} color={theme.colors.primary} style={theme.icon}></Icon>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
})