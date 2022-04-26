import React from 'react';
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Dimensions, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { ListItem, BottomSheet, Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from "../theme";
import ProfilePicture from 'react-native-profile-picture';
import URL from '../url.json';

const windowWidth = Dimensions.get('window').width;

const ages = []
for (let i = 0; i <= 100; i++) {
  ages.push({id: i+'', age: i})
}
    
export default function Profile (props) {
  const [nameFromDatabase, setName] = useState('')
  const [emailFromDatabase, setEmail] = useState('')
  const [ageFromDatabase, setAge] = useState('')
  const [genderFromDatabase, setGender] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [Visible, setVisible] = useState(false)
    
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
  useEffect(() => {
    fetchProfileData()
  }, [])
  
  const resetAge = async () => { 
    try {
      const age = { "age": ageFromDatabase }
      const token = await AsyncStorage.getItem("token")
      const res = await fetch(URL.url+'/resetAge', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(age)
      })
      const response = await res.json()
      if (response.error) {
        Alert.alert(response.error)
      } else {
        console.log("Age successfully reset")
      }
    } catch (err) { 
        console.log(err)
    }
  }

  const resetGender = async () => { 
    try {
      const gender = { "gender": genderFromDatabase }
      const token = await AsyncStorage.getItem("token")
      const res = await fetch(URL.url+'/resetGender', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(gender)
      })
      const response = await res.json()
      if (response.error) {
        Alert.alert(response.error)
      } else {
        console.log("Gender successfully reset")
      }
    } catch (err) { 
        console.log(err)
    }
  }

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
        setIsVisible(true)
      }
    },
    {
      title: 'Gender',
      input: genderFromDatabase,
      onPress: () => {
        setVisible(true)
      }
    }
  ]

  const genderList = [
    {
      title: "male",
      id: 0
    },
    {
      title: "female",
      id: 1
    }
  ]

  const Item = ({item, onPress, backgroundColor, textColor}) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[textColor]}>{item}</Text>
      </TouchableOpacity>
    )
  };

  const GenderItem = ({item, onPress, backgroundColor, textColor}) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.gender, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item}</Text>
      </TouchableOpacity>
    )
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? "#8f8f8f" : "#494949";
    const color = item.id === selectedId ? 'white' : 'grey';

    return (
      <Item
        item={item.age}
        onPress={() => {
          setSelectedId(item.id)
          setAge(item.age)
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const renderGender = ({item}) => {
    const backgroundColor = item.id === selectedId ? "#8f8f8f" : "#494949";
    const color = item.id === selectedId ? 'white' : 'grey';

    return (
      <GenderItem
        item={item.title}
        onPress={() => {
          setSelectedId(item.id)
          setGender(item.title)
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

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
      <BottomSheet isVisible = {isVisible} modalProps={{animationType: 'slide'}}>
        <View style={styles.header}>
          <Text style={{ color: 'white', fontSize: 16 }}>Select your age</Text>
          <Icon name='cross' type='entypo' color='white' onPress={() => {setIsVisible(false), resetAge()}}/>
        </View>
        <SafeAreaView style={{ backgroundColor: '#494949', paddingVertical: 5 }}>
          <FlatList
            horizontal
            data={ages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={true}
            extraData={selectedId}
          />
        </SafeAreaView>
      </BottomSheet>
      <BottomSheet isVisible = {Visible} modalProps={{animationType: 'slide'}}>
        <View style={styles.header}>
          <Text style={{ color: 'white', fontSize: 16 }}>Select your gender</Text>
          <Icon name='cross' type='entypo' color='white' onPress={() => {setVisible(false), resetGender()}}/>
        </View>
        <SafeAreaView style={{ backgroundColor: '#494949', paddingVertical: 5, alignItems: 'center' }}>
          <FlatList
            horizontal
            data={genderList}
            renderItem={renderGender}
            keyExtractor={item => item.title}
            extraData={selectedId}
          />
        </SafeAreaView>
      </BottomSheet>
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
  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#494949',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  },

  item: {
    marginVertical: 8,
    marginHorizontal: 10,
    padding: 5,
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  gender: {
    marginVertical: 8,
    marginHorizontal: windowWidth/6,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontSize: 18
  }
})