const express = require('express')
const app = express()
const models = require('./models')
const cors = require('cors')

const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

//get all movies
app.get('/movies', (req, res) => {
    models.Movie.findAll().then(movies => {
        res.json(movies)
    })
})
//add movie
app.post('/add-movie', (req, res) => {
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