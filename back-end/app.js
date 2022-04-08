// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const path = require("path")

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
const PROFILE = [
  {email: "rfernandez20@palmertrinity.org", password: "password", age:  "21", gender: "male"}
]

// route for HTTP GET requests to the root document
app.get("/", (req, res) => {
  res.send("Goodbye world!")
})

//Routing for login
app.get("/login", (req,res) => { 

})

//Routing for registration 
app.post("/registration", (req,res) => {

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
