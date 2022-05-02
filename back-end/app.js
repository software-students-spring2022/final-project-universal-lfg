// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const path = require("path")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const ensureAuthenticated = require('./config/auth')
const StreamChat = require('stream-chat').StreamChat;
const mongoose = require('mongoose')
const { createPostLobby, joinLobby, leaveLobby } = require('./funcs/chat.js')
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

//Server Client 
const serverClient = StreamChat.getInstance(process.env.CHAT_API_KEY, process.env.CHAT_SECRET)

// route for HTTP GET requests to the root document
app.get("/", (req, res) => {
    res.send("Hello! Don't know why you're requesting here.")
})

//Routing for login
app.post(
    "/login",
    // validators for inputs
    body('email').notEmpty().withMessage('All inputs are required'),
    body('password').notEmpty().withMessage('All inputs are required'),
    body('email').isEmail().withMessage('Email not valid'),
    body('password').isLength({ min: 5 }).withMessage('Must be at least 5 chars long'),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorArray = errors.errors
                return res.status(400).json({ error: errorArray[0].msg })
            }
            // Get user input
            const { email, password } = req.body;

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
app.post(
    "/register",
    // validators for inputs
    body('name').notEmpty().withMessage('All inputs are required'),
    body('email').notEmpty().withMessage('All inputs are required'),
    body('password').notEmpty().withMessage('All inputs are required'),
    body('email').isEmail().withMessage('Email not valid'),
    body('password').isLength({ min: 5 }).withMessage('Must be at least 5 chars long'),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorArray = errors.errors
                return res.status(400).json({ error: errorArray[0].msg })
            }
            // Get user input
            const { name, email, password } = req.body;

            // check if user already exist
            User.findOne({ email: email }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        status: 'an error has occurred, please check the server output'
                    });
                } else if (result) {
                    return res.status(409).json({ error: "User Already Exist. Please Login" });
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
                            const token = jwt.sign({ user_id: user._id, email: user.email },
                                process.env.TOKEN_KEY, {
                                    expiresIn: "365d",
                                }
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
                                } else {
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

//Routing for Password Reset
app.post("/resetPassword", ensureAuthenticated, (req, res) => {
    const userId = req.userId
    const { oldPassword, newPassword } = req.body
    User.findById(userId, (err, user) => {
        if (err) {
            console.log(err)
            res.status(502).json({
                error: err,
                status: 'Internal server error - Failed to retrieve user information from database'
            })
        } else {
            bcrypt.compare(oldPassword, user.password, (err, passwordMatch) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        status: 'an error has occurred, please check the server output'
                    });
                } else if (passwordMatch === true) {
                    // update new password
                    bcrypt.hash(newPassword, 10, (err, hash) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({
                                error: err,
                                status: 'an error has occurred, please check the server output'
                            });
                        } else {
                            User.findByIdAndUpdate(userId, { password: hash }, (err, updateduser) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).json({
                                        error: err,
                                        status: 'an error has occurred, please check the server output'
                                    });
                                } else {
                                    res.status(200).json(updateduser);
                                }
                            })
                        }
                    })
                } else {
                    res.status(400).json({ error: "Invalid current password" });
                }
            });
        }
    })
})

//Routing for Username Reset
app.post(
    "/resetUsername",
    ensureAuthenticated,
    body('username').notEmpty().withMessage('Username is empty!'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorArray = errors.errors
            return res.status(400).json({ error: errorArray[0].msg })
        }
        const userId = req.userId
        const { username } = req.body
        User.findById(userId, (err, user) => {
            if (err) {
                console.log(err)
                res.status(502).json({
                    error: err,
                    status: 'Internal server error - Failed to retrieve user information from database'
                })
            } else {
                if (user.username === username) {
                    res.status(400).json({ error: "Please enter a new username" })
                } else {
                    User.findByIdAndUpdate(userId, { username: username }, (err, updateduser) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({
                                error: err,
                                status: 'an error has occurred, please check the server output'
                            });
                        } else {
                            res.status(200).json(updateduser);
                        }
                    })
                }
            }
        })
    })

//Routing for Email Reset
app.post(
    "/resetEmail",
    ensureAuthenticated,
    body('email').notEmpty().withMessage('Email is empty!'),
    body('email').isEmail().withMessage('Email not valid'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorArray = errors.errors
            return res.status(400).json({ error: errorArray[0].msg })
        }
        const userId = req.userId
        const { email } = req.body
        User.findById(userId, (err, user) => {
            if (err) {
                console.log(err)
                res.status(502).json({
                    error: err,
                    status: 'Internal server error - Failed to retrieve user information from database'
                })
            } else {
                if (user.email === email) {
                    res.status(400).json({ error: "Please enter a new email" })
                } else {
                    User.findByIdAndUpdate(userId, { email: email }, (err, updateduser) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({
                                error: err,
                                status: 'an error has occurred, please check the server output'
                            });
                        } else {
                            res.status(200).json(updateduser);
                        }
                    })
                }
            }
        })
    })

//Routing for Age Reset
app.post(
    "/resetAge", ensureAuthenticated, (req, res) => {
        const userId = req.userId
        const { age } = req.body
        User.findByIdAndUpdate(userId, { age: age }, (err, updateduser) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    error: err,
                    status: 'an error has occurred, please check the server output'
                });
            } else {
                res.status(200).json(updateduser);
            }
        })
    })

//Routing for Gender Reset
app.post(
    "/resetGender", ensureAuthenticated, (req, res) => {
        const userId = req.userId
        const { gender } = req.body
        User.findByIdAndUpdate(userId, { gender: gender }, (err, updateduser) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    error: err,
                    status: 'an error has occurred, please check the server output'
                });
            } else {
                res.status(200).json(updateduser);
            }
        })
    })

//Routing for Browse game posts 
app.get("/browse", ensureAuthenticated, (req, res) => {
    try {
        var name = req.headers.game
        Post.find({ game: name }, function(err, data) {
            if (err) {
                console.log(err)
                res.status(502).json({
                    error: err,
                    status: 'Internal server error - Failed to retrieve posts from database'
                })
            } else {
                Post.find({ game: name }).populate('user').exec(function(err, fullpost) {
                    if (err) console.log(err)
                    else {
                        console.log("Sending ")
                        console.log(fullpost)
                        res.json({
                            posts: fullpost
                        })
                    }
                })
            }
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
            if (err) {
                console.log(err)
                res.status(502).json({
                    error: err,
                    status: 'Internal server error - Failed to retrieve games from database'
                })
            } else {
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
app.post("/create", ensureAuthenticated, (req, res) => {
    try {
        const { game, title, numplayer, mode, rank } = req.body
        const userId = req.userId
        User.findById(userId, (err, user) => {
            if (err) {
                console.log(err)
                res.status(502).json({
                    error: err,
                    status: 'Internal server error - Failed to retrieve user information from database'
                })
            } else if (user) {
                const post = new Post({
                    user: user,
                    game: game,
                    title: title,
                    numplayer: numplayer,
                    mode: mode,
                    rank: rank
                });
                //Save id of post in user 
                user.posts.push(post._id.toString());
                user.save((err) => {
                    if(err) console.log(err)
                    else console.log('Post saved to user DB successfully.')
                })
                post.save((err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            error: err,
                            status: 'an error has occurred, please check the server output'
                        })
                    } else {
                        // return new post
                        console.log(post)
                        createPostLobby(serverClient, user, post)
                            .then((channelId) => {
                                User.findByIdAndUpdate(userId, { post: post }, (err, newuserpost) => {
                                    if (err) {
                                        console.log(err);
                                        res.status(500).json({
                                            error: err,
                                            status: 'an error has occurred, please check the server output'
                                        })
                                    } else {
                                        res.status(200).json(post);
                                    }
                                })
                            })
                        .catch(err => { console.log(err) })
                    }
                })
            }
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({
            error: err,
            status: 'Failed to create new post'
        })
    }
})

app.get('/viewposts', ensureAuthenticated, (req, res) => {
    try {
        const user = req.userId
        //Find the user then populate their posts array 
        User.find({ _id: user }).populate('posts').exec(function(err, fulluser) {
            if (err) console.log(err)
            else {
                console.log("Sending user posts to " + user)
                res.json({
                    posts: fulluser[0].posts
                })
            }
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            error: err,
            status: 'Failed to find users posts'
        })
    }
})

//Routing for profiles 
app.get('/profiles', ensureAuthenticated, (req, res) => {
    try {
        const userId = req.userId
        console.log(userId)
        User.findById(userId, (err, user) => {
            if (err) {
                console.log(err)
                res.status(502).json({
                    error: err,
                    status: 'Internal server error - Failed to retrieve user information from database'
                })
            } else {
                console.log("User data retrieved successfully")
                res.json({
                    name: user.username,
                    email: user.email,
                    age: user.age,
                    gender: user.gender
                })
            }
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({
            error: err,
            status: 'Failed to Profile'
        })
    }

})

app.get('/chat-token', ensureAuthenticated, (req, res) => {
    try {
        const userId = req.userId
        console.log(`Creating chat token for ${userId}`)
        const token = serverClient.createToken(userId)
        console.log(`Token created successfully`)
        User.findById(userId, (err, user) => {
            if (err) {
                console.log(err)
                res.status(502).json({
                    error: err,
                    status: 'Internal server error - Failed to retrieve user information from database'
                })
            } else {
                console.log("User data retrieved successfully")
                res.json({
                    name: user.username,
                    token: token,
                    id: userId
                })
            }
        })
    } catch (err) {
        console.log(err)
        res.status(503).json({
            error: err,
            status: 'Failed to get user chat token'
        })
    }
})

app.get('/delete-post', ensureAuthenticated, (req, res)=>{
    const userId = req.userId 
    const postId = req.headers.id
    console.log('Deleteing lobby for user ' + userId)
    Post.deleteOne({_id:postId}, (err)=>{
        if (err) {
            console.log(err)
            res.status(502).json({
                error: err,
                status: 'Internal server error - Failed to delete post from post database.'
            })
        } else {
            console.log("Deleted post from profile database.")
            res.status(200)
            res.send()
        }
    })
    User.findById({_id:userId}, (err, user)=>{
        if (err) {
            console.log(err)
            res.status(502).json({
                error: err,
                status: 'Internal server error - Failed to delete post from user database.'
            })
        } else {
            let indx = user.posts.indexOf(userId)
            user.posts.splice(indx, 1)
            user.save((err) => {
                if (err){
                    console.log(err)
                    res.status(502).json({
                        error: err,
                        status: 'Internal server error - Failed to delete post from user database.'
                    })
                } else {
                    console.log("Deleted post from user database.")
                    res.status(200)
                    res.send()
                }
            })
        }
    })
})
//Routing to create Messages
// app.post for when users join a team?

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!