import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import theme from "../theme";

export default function ConfirmScreen(props){ 
    return ( 
        <View style={styles.container}> 
            <Text style={{color: 'grey', fontSize: 16, paddingBottom: 30}}>Your password has been reset successfully</Text> 
            <Button 
                title = "Return"
                color="grey"
                onPress = {() => props.navigation.navigate('Home')}
            />
        </View>
    ); 
}

const styles = StyleSheet.create({ 
    container: { 
        backgroundColor: theme.colors.background, 
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})