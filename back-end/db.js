const mongoose = require('mongoose');
const {Schema, connect} = mongoose
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env

// users
const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String },
    age: { type: Number, default: 0 },
    gender: { type: String, default: "Preferred not to say" },
    img: { type: String, default: '/static/profilepics/profilepic.png'},
    games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
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
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    game: { type: String, required: true },
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
console.log(process.env.mongoURI)
connect(db, () => { 
    console.log("Connected to database.")
})
require('./dbIntialiser')