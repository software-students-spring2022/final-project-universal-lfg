//Author(s): Theo Stephens Kehoe
import { Icon } from 'react-native-elements';
import { StyleSheet, View, Dimensions, ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            <TouchableOpacity style={theme.touchable} onPress={() => {gameLink(props.title)}} >
                <ImageBackground source={props.img} style={theme.img}>
                    <View>
                        <TouchableOpacity onPress={() => {console.log(props.title + (props.type=="personal" ? " removed from" : " added to") + " my games")}}>
                            <Icon type='antdesign' name={icon.name} size={35} color={icon.color} style={theme.icon}></Icon>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
        );
}
/*
    gameLink(consoleMsg, gameLink)
    -The function to be called when the card is pressed, preferably a function that links to an app page 
    -Currently logs a message to the console
*/
function gameLink(name, gamelink){ 
    console.log(name + " pressed!");
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