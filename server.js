const express = require('express')
const app = express()
require('dotenv').config() //initialize the dotenv configuation

const models = require('./models')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT

const authenticate = require('./authMiddleware')
global.users = [{username: 'johndoe', password: 'password'}]

console.log(process.env.PORT)
let User = require ('./user')
app.use(cors())
app.use(express.json())

app.all('/api/*', authenticate)



//get all movies
app.get('/api/movies', (req, res) => {
    models.Movie.findAll().then(movies => {
        res.json(movies)
    })
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    let persistedUser = users.find(u => u.username == username && u.password == password)

    if(persistedUser) { //credentials are valid
        var token = jwt.sign({ username: username }, process.env.JWT_SECRET_KEY);
        res.json({token: token})
    } else {
        //credentials are not valid
        res.status(401).json({error: "Invalid credentials"})
    }

})

app.post('/register', (req, res) =>{
    let username = req.body.username
    let password = req.body.password

    let user = new User( username, password)
    console.log(user)
    users.push(user)
    console.log(users)

    res.send('Added to Users')
})

//add movie
app.post('/api/add-movie', (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const year = req.body.year
    const director = req.body.director
    const image = req.body.image

    let movie = models.Movie.build({
        name, description, year, director, image
    })
    movie.save().then(savedMovie => {
        res.send("successfully added movie")
    })
})

//delete movie
app.delete('/api/delete-movie', (req, res) => {
    let movie_id = req.body.id
    models.Movie.destroy({
        where: {
            id: movie_id
        }
    })
    res.send("Deleted")
})





app.listen(PORT, () => {
    console.log('server is running on 8080')
})