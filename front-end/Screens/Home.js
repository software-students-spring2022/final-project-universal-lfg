//Author(s): Theo Stephens Kehoe
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Theme from '../theme';
//Component imports and dependencies
import GameCard from '../Components/GameCard';
import Search from '../Components/SearchBar';
const theme = Theme.colors;
const windowWidth = Dimensions.get('window').width;
//Dynamic imports of game logos 


export default function Home(props) {
  
  const [myGames, setMyGames] = useState([]); 
  const GAMES = props.route.params.games
  const [displayGames, setDisplayGames] = useState(GAMES);
  /*
  addCard / removeCard functions
  -Functions used by individual card components for the removal and addition of games to My Games 
  */
  function addCard(game)  { 
    let present = false;
    for(var i = 0; i < myGames.length; i++){ 
      if(myGames[i].name === game.name){
        present = true 
        break;  
      } 
    }
    if(!present) { 
      console.log("Adding game " + game.name + " to my games.");
      setMyGames([...myGames, game]);
    } else { 
      console.log("User attempted to add game " + game.name + " ... already present.")
    }
  }
  /*
    removeCard 
  */
  function removeCard(game){ 
    console.log("Removing game " + game.name + " from my games.")
    let newGames = myGames.filter((g) => { 
      return g.name !== game.name
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
          <GameCard key={game.name+'personal'} navigation={props.navigation} action={removeCard} game={game} type="personal" theme={theme}/>
      )
    })
  }
  /*
    Games block - If nothing is in the search bar, then display all games - else, display the games that contain search 
  */
  function search(input){
    if(input !== ''){
      let filtered = GAMES.filter(game => { 
        return game.name.startsWith(input)
      })
      setDisplayGames(filtered)
    } else setDisplayGames(GAMES);
  }
  //Return statement ------------------------------------------
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1}}>
      <ScrollView>
        <View style={styles.container}>
            <Text style={styles.mygamesTitle}>My Games</Text>
            <ScrollView horizontal>
              {myGamesBlock}
            </ScrollView>
            <Text style={styles.browseTitle}>Browse</Text>
            <Search action={search}/>
            <View style={styles.browse}>
            {
                (displayGames.length === 0 ? 
                  <View style={styles.noGames}><Text style={styles.emptyText}>No games found!</Text></View>
                 : displayGames.map((game) => { 
                    return(
                        <GameCard key={game.name} navigation={props.navigation} action={addCard} game={game} type="browse" theme={theme}/>
                    )
                  } )
                )
            }
            </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  noGames:{
    height: windowWidth*0.5*1.33, 
    width: windowWidth,
    borderStyle: 'dotted',
    borderWidth: 3,
    borderColor: theme.card,
    alignItems: 'center',
    justifyContent: 'center'
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
