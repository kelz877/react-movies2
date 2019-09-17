const express = require('express')
const app = express()
const models = require('./models')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 8080

const users = [{username: 'johndoe', password: 'password'}]


app.use(cors())
app.use(express.json())


//Middleware
app.all('/api/*', (req,res, next)=> {
    console.log("middleware called...")
    let headers = req.headers['authorization']

    if(headers){
        const token = headers.split(' ')[1]
        console.log(token)
        var decoded = jwt.verify(token, 'someprivatekey');
        if(decoded){
            const username = decoded.username
            //check in the database id the user exists
            const persistedUser = users.find(u => u.username === username)
            if(persistedUser){
                next()
            }else{
                res.json({error: 'Invalid Credentials'})
            }
        }else{
            res.json({error: 'Unauthorized access'})
        }
    }else {
        res.json({error: 'Unauthorized Access'})
    }





})

//get all movies
app.get('/api/movies', (req, res) => {
    models.Movie.findAll().then(movies => {
        res.json(movies)
    })
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    let persistedUser = users.find(u => u.username === username && u.password === password)

    if(persistedUser) { //credentials are valid
        var token = jwt.sign({ username: username }, 'someprivatekey');
        res.json({token: token})
    } else {
        //credentials are not valid
        res.status(401).json({error: "Invalid credentials"})
    }

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


// let movie = models.Movie.build({
//     name: "The Fifth Element",
//     description: 'In the colorful future, a cab driver unwittingly becomes the central figure in the search for a legendary cosmic weapon to keep Evil and Mr. Zorg at bay.',
//     year: 1997,
//     director: "Luc Besson",
//     image: 'https://m.media-amazon.com/images/M/MV5BZWFjYmZmZGQtYzg4YS00ZGE5LTgwYzAtZmQwZjQ2NDliMGVmXkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_SX300.jpg'
// })

// movie.save()


app.listen(PORT, () => {
    console.log('server is running on 8080')
})