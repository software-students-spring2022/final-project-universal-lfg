import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import theme from '../theme'

export default function AppButton({ onPress, title }) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.container}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        elevation: 8,
        width: "70%",
        backgroundColor: theme.colors.button,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin: 12
    },
    buttonText: {
        fontSize: 18,
        color: theme.colors.text,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
  })