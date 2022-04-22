import React from 'react';
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Dimensions  } from 'react-native';
import { Icon, ListItem, BottomSheet } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from "../theme";
import ProfilePicture from 'react-native-profile-picture';
import URL from '../url.json';

const windowWidth = Dimensions.get('window').width;
    
export default function Profile (props) {
  const [nameFromDatabase, setName] = useState('')
  const [emailFromDatabase, setEmail] = useState('')
  const [ageFromDatabase, setAge] = useState('')
  const [genderFromDatabase, setGender] = useState('')
    
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
      setEmail(json.email)
      setAge(json.age)
      setGender(json.gender)
    } catch (err) { 
      console.log(err)
    }
  }

  // set up loading data from server when the component first loads
  fetchProfileData()
  
  const list = [
    {
      title: 'Username',
      input: nameFromDatabase,
      onPress: () => {
          props.navigation.navigate('ResetUsername')
      }
    },
    {
      title: 'Email',
      input: emailFromDatabase,
      onPress: () => {
        props.navigation.navigate('ResetEmail')
      }
    },
    {
      title: 'Age',
      input: ageFromDatabase,
      onPress: () => {
        // props.navigation.navigate('ResetAge')
      }
    },
    {
      title: 'Gender',
      input: genderFromDatabase,
      onPress: () => {
        // props.navigation.navigate('ResetGender')
      }
    }
]

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        
          <Text style={styles.profileTop}>PROFILE</Text>

          <ProfilePicture 
            isPicture={true} 
            requirePicture={require('../assets/profilepic.png')} 
            shape='circle' height={100} width={100}
            pictureStyle={{alignSelf: 'center'}} />
      </View>
      {
        list.map((item, i) => (
          <ListItem
              key={i}
              containerStyle={{ backgroundColor: '#111111', borderColor:'grey', paddingVertical: 20 }}
              onPress={item.onPress}
              bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: 'white' }}>
                <Text>{item.title}</Text>
              </ListItem.Title>
              <ListItem.Input style={{ color: 'grey', paddingBottom: 20, fontSize: 15 }}>
                <Text>{item.input}</Text>
              </ListItem.Input>
            </ListItem.Content>
            <ListItem.Chevron iconStyle={{ color: 'white' }} />
          </ListItem>
        ))
      }
    </SafeAreaProvider>
  )
}
    

const styles = StyleSheet.create({ 
  container: { 
    backgroundColor: theme.colors.background, 
    height: '43%',
    alignSelf: 'center',
    paddingTop: 40
  },

  profileTop: {
    color: theme.colors.primary,
    fontSize: 35,
    fontWeight: "bold",
    alignSelf: 'center',
    marginBottom: 30
  },

  profile: {
    color: theme.colors.primary,
    textAlign: 'left',
    fontSize: 18,
    paddingBottom: 20,
  }
})