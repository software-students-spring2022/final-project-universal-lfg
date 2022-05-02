import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BrowsePost from '../Screens/BrowsePost'
import CreatePost from '../Screens/CreatePost'
import ViewPost from '../Screens/ViewPost'
import HostViewPost from '../Screens/HostViewPost'
import EditPost from '../Screens/EditPost'
import Home from '../Screens/Home';
import LoadingHome from '../Screens/LoadingHome';
import URL from '../url.json'
const Stack = createStackNavigator()

export default function GamePages(props){ 
    const [games, setGames] = useState([])
    const [isLoading, setLoading] = useState(true)
    const getGameList = async () => { 
        try {
            const token = await AsyncStorage.getItem("token")
            const res = await fetch(URL.url+'/homepage', {
                headers:{
                    "x-access-token": token
                }
            })
            const response = await res.json()
            const resGames = response.games
            setGames(resGames)
        } catch (err) { 
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getGameList();
      }, []);
    return(
    <Stack.Navigator screenOptions={{headerShown: false, initialRouteName: "LoadingPage"}}>
          {
              isLoading ? <Stack.Screen name="LoadingPage" component={LoadingHome} /> : 
              <>
                <Stack.Screen name="HomePage" component={Home} initialParams={{games:games}} />
                {
                    games.map((game) => { 
                    return(<Stack.Screen key={game.name} name={game.name} component={BrowsePost} />)
                    }) 
                }
                <Stack.Screen name="ViewPost" component={ViewPost} />
                <Stack.Screen name="HostViewPost" component={HostViewPost} />
                <Stack.Screen name="EditPost" component={EditPost} />
                <Stack.Screen name="CreatePost" component={CreatePost} />
             </>
          }
        </Stack.Navigator>
   );
}