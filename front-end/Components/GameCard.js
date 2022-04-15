//Author(s): Theo Stephens Kehoe
import { Icon } from 'react-native-elements';
import { StyleSheet, View, Dimensions, ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import URL from '../url.json'
const windowWidth = Dimensions.get('window').width;

export default function GameCard(props){ 
    //Props: theme, gamelink, title
    let theme; 
    let icon = {}; 
    if(props.type=="personal"){
        icon.name = 'minussquare';
        icon.color = '#FF4444';
        theme = styles(props.theme, props.type);
    } else if(props.type=="browse"){ 
        icon.name = 'plussquare'
        icon.color = '#2CD767'
        theme = styles(props.theme, props.type);
    } else throw console.error("Invalid GameCard component type");

    return(
        <View style={theme.card}> 
            <TouchableOpacity style={theme.touchable} onPress={() => {props.navigation.navigate(props.game.name, {gameTitle: props.game.name})}} >
                <ImageBackground source={{uri: URL.url + props.game.img}} style={theme.img}>
                    <View>
                        <TouchableOpacity onPress={() => {props.action({title: props.game.name, path: props.game.name, image: props.game.img})}}>
                            <Icon type='antdesign' name={icon.name} size={35} color={icon.color} style={theme.icon}></Icon>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
        );
}
/*
    styles(theme, type)
    -Returns the style sheet based on the type of the card (either browse or personal, i.e a 'my games' card)
    -Uses 'theme' colour
    -Cards are dynamically sized based on 
*/
const styles = (theme, type) => { 
    const personal = StyleSheet.create({ 
        touchable: { 
            shadowColor: theme.shadow,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 3, 
        }, 
        card: { 
            padding:5,
            margin:0,

        },
        img: { 
            //Card aspect ratio is 0.75:1
            height: windowWidth*0.5*1.33, 
            width: windowWidth*0.5,
            flexDirection: 'row-reverse'
        },
        icon:{
        },
        title: { 
            color: theme.text
        },
    })
    const browse = StyleSheet.create({ 
        touchable: { 
            shadowColor: theme.shadow,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 3
        }, 
        card: { 
        },
        img: { 
            //Card aspect ratio is 0.75:1
            height: windowWidth*0.5*1.33, 
            width: windowWidth*0.5,
            flexDirection: 'row-reverse'
        },
        title: { 
            color: theme.text
        }   
});
    if(type=="browse") return browse
    else if(type=="personal") return personal; 
}