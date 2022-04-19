// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const path = require("path")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const ensureAuthenticated = require('./config/auth');

const mongoose = require('mongoose')

require('./db')
require('./ngrok')

// import some useful middleware
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const axios = require("axios") // middleware for making requests to APIs
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use("/static", express.static(__dirname + "/public"))

// custom middleware 
app.use((req, res, next) => {
  // make a modification to either the req or res objects
  res.addedStuff = "First middleware function run!"
  // run the next middleware function, if any
  next()
})

// Access models
const User = mongoose.model('User');
const Game = mongoose.model('Game');
const Post = mongoose.model('Post');
const Message = mongoose.model('Message');

// Load database models
// For backend sprint, just dummy variable
const MESSAGES = [
  {from: "Sample", msg: "Lorem ipsum text"}
]
const POSTS = [
  {game: "LOL", title: "Post1", name: "Name1", initial: "N1", image: "image", rank: "GOLD", detail: "detail1"},
  {game: "CSGO", title: "Post2", name: "Name2", initial: "N2", image: "image", rank: "GOLD", detail: "detail2"},
  {game: "OW", title: "Post3", name: "Name3", initial: "N3", image: "image", rank: "GOLD", detail: "detail3"}
]
const PROFILE = [
  {email: "rfernandez20@palmertrinity.org", password: "password", age:  "21", gender: "male"}
]

const GAMES = require(__dirname + '/public/database/games.json')

// route for HTTP GET requests to the root document
app.get("/", (req, res) => {
  res.send("Hello! Don't know why you're requesting here.")
})

//Routing for login
app.post("/login", (req,res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    // if (!(email && password)) {
    //   res.status(400).json({ error: "All input is required" });
    // }
    // Validate if user exist in our database
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: err,
          status: 'an error has occurred, please check the server output'
        });
      } else if (user) {
        bcrypt.compare(password, user.password, (err, passwordMatch) => {
          if (err) {
              console.log(err);
              res.status(500).json({
                error: err,
                status: 'an error has occurred, please check the server output'
              });
          } else if (passwordMatch === true) {
            // user authenticated
            res.status(200).json(user);
          } else {
            res.status(400).json({ error: "Invalid Credentials" });
          }
        });
      } else {
        res.status(400).json({ error: "User does not exist" })
      }
    });
  } catch (err) {
    console.log(err);
  }
});

//Routing for registration 
app.post("/register", (req,res) => {
  try {
    // Get user input
    const { name, email, password } = req.body;

    // Validate user input
    // if (!(email && password && name)) {
    //   res.status(400).json({ msg: "All input is required" });
    // }

    // if (password.length < 5) { 
    //   res.status(400).json({ msg: "The password should be at least 5 letters" });
    // }

    // check if user already exist
    User.findOne({ email: email }, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: err,
          status: 'an error has occurred, please check the server output'
        });
      } else if (result) {
        return res.status(409).json({ msg: "User Already Exist. Please Login" });
      } else {
        //Encrypt user password
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
              console.log(err);
              res.status(500).json({
                error: err,
                status: 'an error has occurred, please check the server output'
              });
          } else {
            // Create user in our database
            const user = new User({
                username: name,
                email: email,
                password: hash
            });
            // Create token
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.TOKEN_KEY
            );
            // save user token
            user.token = token;
            user.save((err) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({
                    error: err,
                    status: 'an error has occurred, please check the server output'
                  });
                } else{
                  // return new user
                  res.status(201).json(user);
                }
            });
          }
        });
      }
    })
  } catch (err) {
    console.log(err);
  }
});

//Routing for Browse game posts 
app.get("/browse", ensureAuthenticated, (req,res)=> { 
  try {
    var game = req.body.value
    const posts = POSTS
    res.json({
      post : posts
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'Failed to retrieve posts'
    })
  }
})

//Routing for home page 
app.get("/homepage", ensureAuthenticated, (req, res) => { 
  try {
    Game.find({}, function(err, data) { 
      if(err) {
        console.log(err)
        res.status(502).json({
          error: err,
          status: 'Internal server error - Failed to retrieve games from database'
        })
      }
      else {
        console.log("Games data retrieved successfully")
        res.json({
          games: data
        })
      }
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'Failed to games list'
    })
  }
})

//Routing for create post 
app.post("/create" , (req,res) => { 

})

//Routing for viewing a post 
app.get("/viewpost", ensureAuthenticated, (req,res) => { 

})

//Routing for profiles 
app.get('/profiles', ensureAuthenticated, (req,res) => { 

  try {
    const profile = PROFILE //PROFILE is the database with all this info (hopefully)
    res.json({
      email : profile.email,  
      password : profile.password,
      age : profile.age,
      gender : profile.gender 
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retreive data relating to profile from the database'
    })
  }

})

//Routing for messages
app.get('/messages', ensureAuthenticated, (req,res) => {
  // Load messages from database
  try {
    var user = req.body.value
    const messages = MESSAGES
    res.json({
      title : messages.title,
      content : messages.content
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retreive messages from the database'
    })
  }
})

//Routing to create Messages
// app.post for when users join a team?

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
