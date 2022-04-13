// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const path = require("path")
const mongoose = require('mongoose');
require('./db');

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
app.use("/static", express.static("public"))

// custom middleware 
app.use((req, res, next) => {
  // make a modification to either the req or res objects
  res.addedStuff = "First middleware function run!"
  // run the next middleware function, if any
  next()
})

// Load database models
// For backend sprint, just dummy variable
const MESSAGES = [
  {title: "Sample", content: "Lorem ipsum text"}
]
const POSTS = [
  {game: "LOL", title: "Post1", name: "Name1", initial: "N1", image: require("../Images/AddIcon.png"), rank: "GOLD", detail: "detail1"},
  {game: "CSGO", title: "Post2", name: "Name2", initial: "N2", image: require("../Images/AddIcon.png"), rank: "GOLD", detail: "detail2"},
  {game: "OW", title: "Post3", name: "Name3", initial: "N3", image: require("../Images/AddIcon.png"), rank: "GOLD", detail: "detail3"}
]

// route for HTTP GET requests to the root document
app.get("/", (req, res) => {
  res.send("Goodbye world!")
})

//Routing for login
app.post("/login", (req,res) => {
  const email =  req.body.email;
  const password = req.body.password;
  const fs = require('fs');
  fs.readFile('./public/database/users.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(400).json({
        error: err,
        status: 'failed to retrieve user information'
      })
    } else {
      const existUsers = JSON.parse(data).users;
      const finduser = existUsers.filter (user => user.email === email);
      if (finduser.length !== 0) {
        const user = finduser[0];
        if (user.email === email && user.password === password) {
          res.status(200).json({
            email: email,
            password: password
          })
        } else {
          res.status(401).json({message: "invalid credentials"});
        }
      } else {
        res.status(404).json({message: "user not found"});
      }
    }
  })
})

//Routing for registration 
app.post("/registration", (req,res) => {
  const newuser = {
    "username": req.body.name,
    "email": req.body.email,
    "password": req.body.password
  };
  const fs = require('fs');
  fs.readFile('./public/database/users.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(400).json({
        error: err,
        status: 'failed to retrieve user information'
      })
    }
    else {
      const existUsers = JSON.parse(data).users;
      const finduser = existUsers.filter (user => user.email === email);
      if (finduser.length !== 0) {
        res.status(409).json({message: "email already exists"});
      } else {
        existUsers.push(newuser);
        const userJSON = JSON.stringify({ users: existUsers });
        fs.writeFile('./public/database/users.json', userJSON, (err) => {
          if (err) {
            res.status(400).json({
              error: err,
              status: 'failed to update user information'
            })
          } else {
            res.status(200).json({message: "user created"});
          }
        });
      }
    }
});
})

//Routing for Browse game posts 
app.get("/browse", (req,res)=> { 
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
app.get("/homepage", (req, res) => { 

})

//Routing for create post 
app.post("/create" , (req,res) => { 

})

//Routing for viewing a post 
app.get("/viewpost", (req,res) => { 

})

//Routing for profiles 
app.get('/profiles', (req,res) => { 

})

//Routing for messages
app.get('/messages', (req,res) => {
  // Load messages from database
  try {
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
