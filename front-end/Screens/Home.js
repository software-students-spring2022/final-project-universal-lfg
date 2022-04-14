//Author(s): Theo Stephens Kehoe
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Theme from '../theme';
//Component imports and dependencies
import GameCard from '../Components/GameCard';
const theme = Theme.colors;
const windowWidth = Dimensions.get('window').width;
//Dynamic imports of game logos 


export default function Home(props) {
  
  const [myGames, setMyGames] = useState([]); 
  const GAMES = props.route.params.games
  /*
  addCard / removeCard functions
  -Functions used by individual card components for the removal and addition of games to My Games 
  */
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
  /*
  'My Games' block logic - if nothing is in the my games list, a small 'empty card' is displayed instead 
  */
  let myGamesBlock;
  if(myGames.length === 0){              
    myGamesBlock = <View style={styles.emptyCard}><Text style={styles.emptyText}>No games added!</Text></View>
  }
  else {
    myGamesBlock = myGames.map((game) => { 
      return(
          <GameCard key={game.title+'personal'} navigation={props.navigation} action={removeCard} game={game} type="personal" theme={theme}/>
      )
    })
  }
  //Return statement ------------------------------------------
  return (
      <ScrollView>
        <View style={styles.container}>
            <Text style={styles.mygamesTitle}>My Games</Text>
            <ScrollView horizontal>
              {myGamesBlock}
            </ScrollView>
            <Text style={styles.browseTitle}>Browse</Text>
            <View style={styles.browse}>
            {
                GAMES.map((game) => { 
                    return(
                        <GameCard key={game.title+'browse'} navigation={props.navigation} action={addCard} game={game} type="browse" theme={theme}/>
                    )
                } )
            }
            </View>
        </View>
    </ScrollView>
  );
}
//--------------------------------------------------------------
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
  },
  emptyCard: { 
    height: windowWidth*0.5*1.33, 
    width: windowWidth*0.5,
    borderStyle: 'dotted',
    borderWidth: 3,
    borderColor: theme.card,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: { 
    color: theme.card,
    fontSize: 15,
    fontWeight: "bold",
    padding:13
  }
});
