import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar, Button, BottomSheet, Icon, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import ProgressBar from '../Components/ProgressBar';
import theme from '../theme';

export default function ViewPost({route, navigation}){
    const { game, title, name, initial, image, rank, detail } = route.params

    const [activeSpot, setActiveSpot] = useState(1);
    const totalSpots = 5;
    const onPress = () => {
        if (activeSpot <= totalSpots) {
            console.log("One Player Joined the Team");
            setActiveSpot(prev => prev + 1);
        } else {
            console.log("The Team is Full")
        }
    }

    // const [isVisible, setIsVisible] = useState(false);
    // const list = [
    //     { 
    //         title: 'Post Options',
    //         icon: 'cross',
    //         type: 'entypo',
    //         onPress: () => setIsVisible(false)
    //     },
    //     { 
    //         title: 'Report Post',
    //         icon: 'warning',
    //         type: 'antdesign'
    //     },
    //     {
    //         title: 'Edit Post',
    //         icon: 'edit',
    //         type: 'antdesign'
    //     },
    //     {
    //         title: 'Delete Post',
    //         icon: 'delete',
    //         type: 'antdesign'
    //     }
    // ];

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
                        <Icon type='antdesign' name={'left'} size={30} color={'#d9d9d9'}></Icon>
                    </TouchableOpacity>
                    <Avatar
                        size="small"
                        rounded
                        source={image}
                        // title={initial}
                        containerStyle={{backgroundColor: 'lightgrey'}}
                    />
                    <Text style={{color: '#d9d9d9', textAlign: 'left', marginLeft: 20, fontSize:12}}> {name}{"\n"}{game} </Text>
                </View>
                <ScrollView style={styles.content}>
                    <View style={styles.title}>
                        <Text style={{fontWeight: 'bold', fontSize: 20, color: theme.colors.text,}}>{title}</Text>
                        <TouchableOpacity onPress={() => setIsVisible(true)} style={{justifyContent: "flex-end"}}>
                            {/* Navigate to  Edit Page*/}
                            <Icon type='antdesign' name={'edit'} size={25} color={'#d9d9d9'} onPress={() => console.log('Edit Post')}></Icon>
                        </TouchableOpacity>    
                    </View>
                    <Icon type='material' name={'computer'} size={20} color='black' containerStyle={styles.icon}></Icon>
                    <Text style={{color: 'lightgrey'}}>Rank: {rank}</Text>
                    <Text style={styles.detail}>{detail}</Text>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <ProgressBar key={title} activeSpot={activeSpot} totalSpots={totalSpots} />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onPress}
                        >
                            <Text style={{color: theme.colors.text, fontSize: 15}}>Join</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.lobby}>
                        <View style={{flexDirection: 'row'}}>
                            <Icon type='feather' name={'users'} size={20} color='grey'></Icon>
                            <Text style={{color: '#ECECEC', fontSize: 15, marginLeft: 10}}>30 Active in Lobby</Text>
                        </View>
                        <Button 
                            onPress={() => console.log('Enter Chat Room')} // Navigate to chat page
                            title = "Join Lobby"
                            color = {theme.colors.button}
                        />
                    </View>
                </ScrollView>
                {/* <View>
                    <BottomSheet
                        isVisible = {isVisible}
                        containerStyle = {{ backgroundColor: '#111111' }}
                        // titleStyle = {{ color: 'white' }}
                    >
                        {list.map((item, i) => (
                            <ListItem 
                                key={i} 
                                title={item.title}
                                rightIcon={{ name: item.icon, type: item.type, size: 20, onPress: item.onPress }}
                                bottomDivider
                            />
                        ))}
                    </BottomSheet>;
                </View> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 5,
    },
    titleBar: {
        width: "100%",
        flexDirection: 'row',
        height:70,
        backgroundColor: '#111111',
        alignItems: "center",
        shadowColor: "#a5a5a5",
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        
        elevation: 20
    },
    backButton: { 
        marginHorizontal: 15
    },
    content: {
        marginHorizontal: 15,
        marginVertical: 15
    },
    title: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingBottom: 8,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.7
    },
    icon: {
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: theme.colors.primary,
        marginBottom:10
    },
    detail: {
        marginTop: 20,
        marginBottom: 200,
        color: theme.colors.text
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: theme.colors.button,
        color: 'white'
    },
    lobby: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: "center",
        marginTop: 50
    }
})