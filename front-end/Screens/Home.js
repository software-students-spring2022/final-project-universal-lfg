//Author(s): Theo Stephens Kehoe
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Theme from '../theme';
//Component imports and dependencies
import GameCard from '../Components/GameCard';
const theme = Theme.colors;

//Dynamic imports of game logos 
import GAMES from '../assets/games_index/index.js'


export default function Home({navigation}) {
  const [myGames, setMyGames] = useState([]); 

  function addCard(game)  { 
    let present = false;
    for(var i = 0; i < myGames.length; i++){ 
      if(myGames[i].title === game.title){
        present = true 
        break;  
      } 
    }
    if(!present) { 
      console.log("Adding game " + game.title + " to my games.");
      setMyGames([...myGames, game]);
    } else { 
      console.log("User attempted to add game " + game.title + " ... already present.")
    }
  }

  function removeCard(game){ 
    console.log("Removing game " + game.title + " from my games.")
    let newGames = myGames.filter((g) => { 
      return g.title !== game.title
    }); 
    setMyGames([...newGames]) 
  }

  return (
      <ScrollView>
        <View style={styles.container}>
            <Text style={styles.mygamesTitle}>My Games</Text>
            <ScrollView horizontal>
            {
                myGames.map((game) => { 
                    return(
                        <GameCard key={game.title+'personal'} navigation={navigation} action={removeCard} game={game} type="personal" theme={theme}/>
                    )
                } )
            }
            </ScrollView>
            <Text style={styles.browseTitle}>Browse</Text>
            <View style={styles.browse}>
            {
                GAMES.map((game) => { 
                    return(
                        <GameCard key={game.title+'browse'} navigation={navigation} action={addCard} game={game} type="browse" theme={theme}/>
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
