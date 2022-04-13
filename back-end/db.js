require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
import { Schema, connect } from 'mongoose';

// my schema goes here!

// users
const User = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    img: { data: Buffer, contentType: String },
    posts:  [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

// games
const Game = new Schema({
    name: { type: String, unique: true, required: true },
    img: { data: Buffer, contentType: String },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
})

// posts
const Post = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    game: { type: Schema.Types.ObjectId, ref: 'Game', require: true },
    title: { type: String, required: true },
    numplayer: { type: String, required: true },
    mode: { type: String },
    rank: { type: String }
})

// messages
const Message = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    to: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    sentAt: { type: Date, require: true },
    msg: { type: String, require: true }
})

// connect to database
const db = process.env.mongoURI;
connect(db);