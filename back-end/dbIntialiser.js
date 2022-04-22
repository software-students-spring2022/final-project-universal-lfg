const mongoose = require('mongoose');
const User = mongoose.model('User');
const Game = mongoose.model('Game');
const Post = mongoose.model('Post');
const Message = mongoose.model('Message');
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

function insertExamplePosts(){
    const posts = [] 
    posts.push(new Post({
        user: mongoose.Types.ObjectId('6260465fb333728b7d3cf122'), 
        game: "League of Legends", 
        title: "5 v 5", 
        numplayer: "5", 
        mode: "Competitive", 
        rank: "Silver"
    }))
    posts.push(new Post({
        user: mongoose.Types.ObjectId('6260465fb333728b7d3cf122'), 
        game: "League of Legends", 
        title: "5 v 5", 
        numplayer: "5", 
        mode: "Competitive", 
        rank: "Gold"
    }))
    posts.push(new Post({
        user: mongoose.Types.ObjectId('6260465fb333728b7d3cf122'), 
        game: "League of Legends", 
        title: "5 v 5", 
        numplayer: "5", 
        mode: "Competitive", 
        rank: "Platinum"
    }))
    posts.push(new Post({
        user: mongoose.Types.ObjectId('6260465fb333728b7d3cf122'), 
        game: "Valorant", 
        title: "5 v 5", 
        numplayer: "5", 
        mode: "Competitive", 
        rank: "Silver"
    }))
    posts.push(new Post({
        user: mongoose.Types.ObjectId('6260465fb333728b7d3cf122'), 
        game: "Valorant", 
        title: "5 v 5", 
        numplayer: "5", 
        mode: "Competitive", 
        rank: "Gold"
    }))
    posts.push(new Post({
        user: mongoose.Types.ObjectId('6260465fb333728b7d3cf122'), 
        game: "Valorant", 
        title: "5 v 5", 
        numplayer: "5", 
        mode: "Competitive", 
        rank: "Platinum"
    }))
    posts.forEach(post => { 
        post.save(function(err, succ){
            if(err) console.log(err)
            else console.log("Saved post '"+succ.title+"' to database.")
        })
    })
}
insertExamplePosts();