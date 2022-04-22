import React from 'react';
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Dimensions, Image  } from 'react-native';
import theme from "../theme";
import ProfilePicture from 'react-native-profile-picture';
import URL from '../url.json';

const windowWidth = Dimensions.get('window').width;
    
export default function Profile (props) {
  const [nameFromDatabase, setName] = useState('')
  const [emailFromDatabase, setEmail] = useState('')
  const [ageFromDataBase, setAge] = useState('')
  const [genderFromDataBase, setGender] = useState('')
    
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
  
  return (
    <>
      <View style={styles.container}>
        
          <Text style={styles.profileTop}>Profile</Text>

          <ProfilePicture 
            isPicture={true} 
            requirePicture={require('../assets/profilepic.png')} 
            shape='square' height={100} width={100}
            pictureStyle={{marginBottom: 30, alignSelf: 'center'}} />
          <Text style={styles.profile}>Username: {nameFromDatabase} </Text>
          <Text style={styles.profile}>Email: {emailFromDatabase} </Text>
          <Text style={styles.profile}>Age: {ageFromDataBase}</Text>
          <Text style={styles.profile}>Gender: {genderFromDataBase} </Text>

      </View>
    </>
  )
}
    

const styles = StyleSheet.create({ 
  container: { 
    backgroundColor: theme.colors.background, 
    height: '100%',
    alignSelf: 'center',
    paddingTop: 40
  },

  profileTop: {
    color: 'white',
    fontSize: 35,
    fontWeight: "bold",
    alignSelf: 'center',
    paddingBottom: 13
  },

  profile: {
    color: theme.colors.primary,
    textAlign: 'left',
    fontSize: 18,
    paddingBottom: 13,
    paddingLeft: 13
  }
})