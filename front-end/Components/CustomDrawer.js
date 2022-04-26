import { React, useState } from 'react'; 
import {View, Text, ImageBackground, Image, StyleSheet} from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Icon, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../theme';
import ProfilePicture from 'react-native-profile-picture';
import URL from '../url.json';

export default function CustomDrawer(props) { 
    const [name, setName] = useState('')
    const fetchProfileData = async () => {
        try {
          const token = await AsyncStorage.getItem("token")
          const res = await fetch(URL.url+'/profiles', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token
            }
          });
          const json = await res.json();
          setName(json.name)
        } catch (err) { 
          console.log(err)
        }
    }

    fetchProfileData()

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.header}>
                    <View style={styles.profilepic}>
                        <ProfilePicture 
                            isPicture={true} 
                            requirePicture={require('../assets/profilepic.png')} 
                            shape='circle' user='John Doe' height={100} width={100}
                            style={styles.headerImg} />
                        <Text style={styles.user}>{name} <Text style={{color: theme.colors.primary}}>#1245</Text></Text>
                        <View style={styles.status}>
                            <Icon type='fontawesome' name='circle' size={10} color='green' style={{marginRight: 5}}/>
                            <Text style={styles.status}>Online</Text>
                        </View>
                    </View>
                <View style={{justifyContent:'center'}}> 
                    <Button title='Edit Profile' buttonStyle={{backgroundColor: theme.colors.border, margin:10}} 
                        onPress={() => { 
                            props.navigation.navigate('Profile')
                        }}
                    />
                </View>
                </View>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
        </View>
    ); 
}

const styles = StyleSheet.create({ 
    header: { 
        flexDirection:'row',
        flex: 1,
        padding: 10,
        paddingBottom: 15
    },
    profilepic: { 
        width: '50%', 
        justifyContent: 'center', 
        flexDirection: 'column', 
        paddingTop: 20,
        alignItems: 'center'
    },
    user: { 
        color: theme.colors.text,
        paddingTop: 10,
        paddingBottom: 5
    },
    status: { 
        flexDirection:'row', 
        alignItems:'center',
        color: 'green',
        marginRight: 5
    }
})