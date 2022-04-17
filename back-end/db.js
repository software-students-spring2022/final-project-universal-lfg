const mongoose = require('mongoose');
const {Schema, connect} = mongoose
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env

// users
const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String },
    age: { type: Number },
    gender: { type: String },
    img: { data: Buffer, contentType: String },
    posts:  [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

// games
const GameSchema = new Schema({
    name: { type: String, unique: true, required: true },
    img: { type: String, required:true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
})

// posts
const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    game: { type: Schema.Types.ObjectId, ref: 'Game', require: true },
    title: { type: String, required: true },
    numplayer: { type: String, required: true },
    mode: { type: String },
    rank: { type: String }
})

// messages
const MessageSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    to: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    sentAt: { type: Date, require: true },
    msg: { type: String, require: true }
})

// define the models
const User = mongoose.model('User', UserSchema);
const Game = mongoose.model('Game', GameSchema);
const Post = mongoose.model('Post', PostSchema);
const Message = mongoose.model('Message', MessageSchema);

// connect to database
const db = process.env.mongoURI;
connect(db, () => { 
    console.log("Connected to database.")
})


function insertGames(){ 
    const games = []
    function saveGame(err, result){ 
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
        }
    }
    games.push(new Game({
        name: 'League of Legends', 
        img: '/static/images/league.png', 
        posts: []
    }))
    games.push(new Game({
        name: 'Minecraft', 
        img: '/static/images/minecraft.png', 
        posts: []
    }))
    games.push(new Game({
        name: 'CS:GO', 
        img: '/static/images/counter-strike.png',
        posts: []
    }))
    games.push(new Game({
        name: 'Valorant', 
        img: '/static/images/valorant.png', 
        posts: []
    }))
    games.push(new Game({ 
        name: 'Apex Legends', 
        img: '/static/images/apex.png', 
        posts: []
    }))
    games.push(new Game({ 
        name: 'Rust', 
        img: '/static/images/rust.png', 
        posts: []
    }))
    games.push(new Game({ 
        name: 'Fortnite', 
        img: '/static/images/fortnite.png', 
        posts: []
    }))
    games.push(new Game({ 
        name: 'World of Warcraft', 
        img: '/static/images/WoW.png', 
        posts: []
    }))
    games.push(new Game({ 
        name: 'Dota 2', 
        img: '/static/images/dota2.png', 
        posts: []
    }))
    games.push(new Game({ 
        name: 'Civilization VI', 
        img: '/static/images/civVI.png', 
        posts: []
    }))
    games.push(new Game({ 
        name: 'Overwatch', 
        img: '/static/images/overwatch.png', 
        posts: []
    }))
    games.push(new Game({ 
        name: 'Rust', 
        img: '/static/images/rust.png', 
        posts: []
    }))
    games.forEach((game) => { 
        game.save(saveGame)
    })
}