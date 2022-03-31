import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import theme from '../theme';

export default function ProgressBar(props) {
    //props: activeSpot, totalSpots

    const Spots = new Array(props.totalSpots).fill('').map((spot,index)=>{
        const spotIndex = index+1;
        spot = spotIndex < props.activeSpot ? require('front-end/Images/green.jpg'): require('front-end/Images/grey.jpg');
        return spot;
    });

    return (
        <View style={styles.progressBar}>
            {
                Spots.map((spot) => {
                    return (
                        <Image 
                            style={styles.spot}
                            source = {spot}
                        />
                    )
                })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    progressBar: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    spot: {
        width: 50,
        height: 50
    }
})