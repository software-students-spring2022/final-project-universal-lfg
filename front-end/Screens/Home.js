//Author(s): Theo Stephens Kehoe
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Theme from '../theme';
//Component imports and dependencies
import GameCard from '../Components/GameCard';
const theme = Theme.colors;

//Dynamic imports of game logos 
import GAMES from '../assets/games_index/index.js'

export default function Home() {
  return (
      <ScrollView>
        <View style={styles.container}>
            <Text style={styles.mygamesTitle}>My Games</Text>
            <ScrollView horizontal>
            {
                GAMES.map((game) => { 
                    return(
                        <GameCard key={game.title+'personal'} img={game.image} type="personal" title={game.title} theme={theme} />
                    )
                } )
            }
            </ScrollView>
            <Text style={styles.browseTitle}>Browse</Text>
            <View style={styles.browse}>
            {
                GAMES.map((game) => { 
                    return(
                        <GameCard key={game.title+'browse'} img={game.image} type="browse" title={game.title} theme={theme} />
                    )
                } )
            }
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: theme.background, 
  },
  text: { 
      color: theme.text
  },
  browse: { 
    flexWrap: "wrap",
    flexDirection: "row"
  },
  mygamesTitle: { 
    color: theme.text,
    fontSize: 35,
    fontWeight: "bold",
    paddingBottom: 13,
    paddingLeft: 13
  }, 
  browseTitle: { 
    color: theme.text,
    fontSize: 35,
    fontWeight: "bold",
    padding:13
  }, 
  gameIcon: { 
    backgroundColor: '#000000'
  }
});
