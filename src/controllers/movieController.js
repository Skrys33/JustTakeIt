const express = require('express')
const app = express.Router()
const api = require('../../config/api')
const Historical = require("../models/historical")
const bodyParser = require('body-parser')
app.use(bodyParser.json())
 
app.get('/movieDetails/:id', async (req, res, next) => {
    const detailsFilm =JSON.parse( await api.findFilmById(req.params.id))

    
    const movieName = detailsFilm.original_title
    const poster = 'https://image.tmdb.org/t/p/w500' + detailsFilm.poster_path
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

app.get('/search', async (req, res, next) => {
    const films = JSON.parse(await api.findFilmByName(req.param("film")))
    res.render('movies/search', {films})
});

app.get('/topMovies', async (req, res, next) => {
    const result = JSON.parse(await api.getTopMovies())
    res.format({
        html: () => {res.render('movies/topMovies', {result})},
   })
});

app.get('/moviesOfMonth', async (req, res, next) => {
    const result = JSON.parse(await api.getMovieReleaseMonth())
    res.format({
        html: () => {res.render('movies/moviesOfMonth', {result})},
   })
});

app.get('/historical', (req,res) => {
    let id = req.session.user._id
    Historical.find({'idUser': id}, function(err, historical) {
        return historical
    }).then((historical) => {
        //console.log(historical[0])
        if(historical[0] == undefined) {
            // let newHisto = new Historical({ idMovie: 299536, idUser: id, movieName: 'name of the movie' })
            // newHisto.save(function (err, newUser) {
            //     if (err) return console.error(err)
            //     console.log('film : ' + newHisto)
            // })
            res.render('movies/historical', {errors: ['No historical !']})
        }
        else {
            //Historical.remove({ _id: '4bfb00b2-e405-418e-8f47-b923ad3a9d4d' }, function(err) {console.log('remove ok !')})
            //recup le lien vers le details de chaque film
            // const films = JSON.parse(await api.findFilmById(historical[0].idMovie))
            // for(let item in historical){
            //     const films = JSON.parse(await api.findFilmById(item.idMovie))
            //     histo.push(films)
            // }
            res.render('movies/historical', {historical})
        }
    })
})

module.exports = app