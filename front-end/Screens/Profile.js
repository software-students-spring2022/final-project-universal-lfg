import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { StyleSheet, Text, View, Dimensions, Image  } from 'react-native';
import { ThemeColors } from 'react-navigation';
import theme from "../theme";
import GameCard from '../Components/GameCard';
const windowWidth = Dimensions.get('window').width;
 
// export default function Profile(props){ 

    // let emailFromDatabase = 'couldnt find email';
    // let passwordFromDatabase = 'couldnt find password';
    // let age = 'placeholder';
    // let gender = 'placeholder';
    //let icon = <View style={styles.emptyCard}><Text style={styles.emptyText}> <Image source={require('front-end/Images/AddIcon.png')} /></Text></View>;
    
    const Profile = props => {
        const [emailFromDatabase, setEmail] = useState(['couldnt find email'])
        const [passwordFromDatabase, setPassword] = useState('couldnt find password')
        const [ageFromDataBase, setAge] = useState('couldnt find age')
        const [genderFromDataBase, setGender] = useState('couldnt find gender')
        const [error, setError] = useState('error oof')
        const [feedback, setFeedback] = useState('')
      
        /**
         * A nested function that fetches messages from the back-end server.
         */
        const fetchProfileData = () => {
          // setMessages([])
          // setLoaded(false)
          axios
            .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/profiles`)
            .then(response => {
              // axios bundles up all response data in response.data property
              const email = response.data.email
              setEmail(email)
              const password = response.data.password
              setPassword(password)
              const age = response.data.age
              setAge(age)
              const gender = response.data.gender
              setGender(gender)
            })
            .catch(err => {
              setError(err)
            })
            // .finally(() => {
            //   // the response has been received, so remove the loading icon
            //   setLoaded(true)
            // })
        }
      
        /**
         * A nested function used to add a new message to the list of messages
         * @param {*} message The new message to add to the list
         */
        // const addMessageToList = message => {
        //   const newMessages = [...messages, message] // make an array with all the old values plus the new one
        //   setMessages(newMessages) // save the new array
        // }
      
        // set up loading data from server when the component first loads
        useEffect(() => {
          // fetch messages this once
          fetchProfileData()
      
          // set a timer to load data from server every n seconds
          const intervalHandle = setInterval(() => {
            fetchMessages()
          }, 5000000000)
      
          // return a function that will be called when this component unloads
          return e => {
            // clear the timer, so we don't still load messages when this component is not loaded anymore
            clearInterval(intervalHandle)
          }
        }, []) // putting a blank array as second argument will cause this function to run only once when component first loads
      
        return (
          <>

            <View style={styles.container}>
                <Text style={styles.profileTop}>Profile</Text>
                {/* <Text style={styles.icon}> {icon}</Text> */}
                <Text style={styles.email}>Email: {emailFromDatabase} </Text>
                <Text style={styles.password}>Password: {passwordFromDatabase}</Text>
                <Text style={styles.age}>Age (optional): {ageFromDataBase}</Text>
                <Text style={styles.gender}>Gender (optional): {genderFromDataBase} </Text>
            
            </View>
            {/* <h1>Leave a message!</h1>
      
            {feedback && <p className="MessageForm-feedback">{feedback}</p>}
            {error && <p className="MessageForm-error">{error}</p>}
      
            <MessageForm
              setError={setError}
              setFeedback={setFeedback}
              addMessageToList={addMessageToList}
            />
      
            {error && <p className="Messages-error">{error}</p>}
            {!loaded && <img src={loadingIcon} alt="loading" />}
            {messages.map(message => (
              <Message key={message._id} message={message} />
            )
            )} */}
          </>
        )
      }
      export default Profile
    
//     return ( 
        
//         <View style={styles.container}>
//             <Text style={styles.profileTop}>Profile</Text>
//             <Text style={styles.icon}> {icon}</Text>
//             <Text style={styles.email}>Email: {emailFromDatabase} </Text>
//             <Text style={styles.password}>Password: {passwordFromDatabase}</Text>
//             <Text style={styles.age}>Age (optional): {age}</Text>
//             <Text style={styles.gender}>Gender (optional): {gender} </Text>
           
//         </View>
//   );


     
//}

const styles = StyleSheet.create({ 
    container: { 
        backgroundColor: theme.colors.background, 
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0
    },
    
    text: { 
        color: theme.text
    },

    profileTop : {
        color: 'white',
        fontSize: 35,
        fontWeight: "bold",
        paddingBottom: 13,
        paddingLeft: 13
    },

    email : {
        color: Theme.colors.primary,
        fontSize: 15,
        paddingBottom: 13,
        paddingLeft: 13
    },

    password : {
        color: Theme.colors.primary,
        fontSize: 15,
        paddingBottom: 13,
        paddingLeft: 13
    },

    age : {
        color: Theme.colors.primary,
        fontSize: 15,
        paddingBottom: 13,
        paddingLeft: 13
    },

    icon : {
        color: Theme.colors.primary,
        fontSize: 15,
        paddingBottom: 13,
        paddingLeft: 13
    },

    gender : {
        color: Theme.colors.primary,
        fontSize: 15,
        paddingBottom: 13,
        paddingLeft: 13
    },


    // emptyCard: { 
    //     height: windowWidth*0.5, 
    //     width: windowWidth*0.5,
    //     borderStyle: 'solid',
    //     borderWidth: 3,
    //     borderColor: theme.colors.primary,
    //     alignItems: 'center',
    //     justifyContent: 'center'
    //   }


    
})