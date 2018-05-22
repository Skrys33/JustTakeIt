const express = require('express')
const app = express.Router()
const api = require('../../config/api')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
 
app.get('/movieDetails/:id', async (req, res, next) => {
    const detailsFilm =JSON.parse( await api.findFilmById(req.params.id))

    const movieName = detailsFilm.belongs_to_collection.name
    const poster = 'https://image.tmdb.org/t/p/w500' + detailsFilm.belongs_to_collection.poster_path
    const overview = detailsFilm.overview
    const vote_average = detailsFilm.vote_average
    const release_date = detailsFilm.release_date
    
    const genres = detailsFilm.genres
    
    res.format({
        html: () => {res.render('movies/movieDetails', {movieName, poster, overview, vote_average, release_date, genres})},
   })
})

app.get('/movieDetails', (req, res, next) => {
    const movieName = ''
    res.format({
        html: () => {res.render('movies/movieDetails', {movieName})},
    })
})

app.get('/search/:film', async (req, res, next) => {
    const films = JSON.parse(await api.findFilmByName(req.params.film))
    res.format({
        html: () => {res.render('movies/search', {films})},
   })
});

app.get('/search', (req, res, next) => {
    res.format({
        html: () => {res.render('movies/search')},
   })
});

module.exports = app