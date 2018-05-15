const express = require('express')
const app = express.Router()
const api = require('../../config/api')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
 
app.get('/movieDetails/:id', async (req, res, next) => {
    const detailsFilm =JSON.parse( await api.findFilmById(req.params.id))
    console.log('1')
    console.log( detailsFilm.belongs_to_collection)
    console.log('-------------')

    const movieName = detailsFilm.belongs_to_collection.name
        
    res.format({
        html: () => {res.render('auth/movieDetails', {movieName})},
   })
})

app.get('/movieDetails', (req, res, next) => {
    const movieName = ''
    res.format({
        html: () => {res.render('auth/movieDetails', {movieName})},
    })
})

module.exports = app