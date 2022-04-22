import { React, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Icon, ListItem, BottomSheet } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from "../theme";

export default function Settings(props){ 
    const [isVisible, setIsVisible] = useState(false);
    const list = [
        {
          title: 'Edit Password',
          onPress: () => {
              props.navigation.navigate('ResetPassword')
          }
        },
        {
          title: 'Logout',
          onPress: () => {
            setIsVisible(true)
          }
        }
    ]
    return (
        <SafeAreaProvider>
            <View style={styles.container}> 
                {
                    list.map((item, i) => (
                    <ListItem
                        key={i}
                        containerStyle={{ backgroundColor: '#111111', borderColor:'grey', paddingVertical: 20 }}
                        onPress={item.onPress}
                        bottomDivider
                        // chevron={{ color: 'white' }}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={{ color: 'white' }}>
                                <Text>{item.title}</Text>
                            </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron iconStyle={{ color: 'white' }} />
                    </ListItem>
                    ))
                } 
                <BottomSheet isVisible = {isVisible} modalProps={{}}>
                    <View style={styles.bottomTitle}>
                        <Text style={{ color: 'white', fontSize: 18, marginLeft: 20 }}>Logout</Text>
                        <Icon name="cross" type="entypo" color='white' containerStyle={{ position: 'absolute', right: 20 }} onPress={ () => setIsVisible(false) }/>
                    </View>
                    <Text style={{ color: 'white', fontSize: 18, paddingVertical: 20, textAlign: 'center'}}>Are you sure you want to logout?</Text>
                    <View style={styles.buttons}>
                        <Button 
                            title = "Cancel"
                            color="grey"
                            onPress = {() => setIsVisible(false)}
                        />
                        <Button
                            title = "Logout"
                            color="red"
                            onPress = { async () => {
                                await AsyncStorage.removeItem("token")
                                props.navigation.navigate('LoginScreen')
                            }}
                        />
                    </View>
                </BottomSheet>
            </View>
        </SafeAreaProvider>
    ); 
}

const styles = StyleSheet.create({ 
    container: { 
        backgroundColor: theme.colors.background, 
        height: '100%'
    },
    bottomTitle: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center'
    },
    buttons: {
        flexDirection: 'row',
        paddingHorizontal: 100,
        paddingVertical: 10,
        justifyContent: 'space-between'
    }
})