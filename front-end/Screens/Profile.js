<<<<<<< HEAD
import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import theme from "../theme";

export default function Profile(props){ 
    return ( 
        <View style={styles.container}> 
            <Text style={{color: theme.colors.card, fontSize: 15}}>This is the Profile page.</Text> 
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
=======
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image  } from 'react-native';
import { ThemeColors } from 'react-navigation';
import theme from "../theme";
import GameCard from '../Components/GameCard';
const windowWidth = Dimensions.get('window').width;
 
export default function Profile(props){ 

    let emailFromDatabase = 'placeholder';
    let passwordFromDatabase = '******** (placeholder)';
    let age = 'placeholder';
    let gender = 'placeholder';
    let icon = <View style={styles.emptyCard}><Text style={styles.emptyText}> <Image source={require('front-end/Images/AddIcon.png')} /></Text></View>;
    return ( 
        
        <View style={styles.container}>
            <Text style={styles.profileTop}>Profile</Text>
            <Text style={styles.icon}> {icon}</Text>
            <Text style={styles.email}>Email: {emailFromDatabase} </Text>
            <Text style={styles.password}>Password: {passwordFromDatabase}</Text>
            <Text style={styles.age}>Age (optional): {age}</Text>
            <Text style={styles.gender}>Gender (optional): {gender} </Text>
           
        </View>
  );


     
}

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


    emptyCard: { 
        height: windowWidth*0.5, 
        width: windowWidth*0.5,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
      }


    
>>>>>>> a02a5034cc087b2c466e972047f6ba899bb54194
})