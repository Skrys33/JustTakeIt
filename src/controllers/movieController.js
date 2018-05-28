const express = require('express')
const app = express.Router()
const api = require('../../config/api')
const Historical = require("../models/historical")
const Account = require('../models/account')
const Movie = require('../models/movie')
const Ticket = require('../models/ticket')
const bodyParser = require('body-parser')
const cache = require('../redis-cache/cache')
const redis = require('redis')
app.use(bodyParser.json())

app.post('/movieDetails/:id', (req,res) => {
    //astuce : regenerer le wallet à chaque fois pour les tests
    Account.findById('442a9bba-7967-4bfb-8bf3-4950be368215', function(err, account) {
        account.wallet = 12
        account.save(function (err, updateAccount) {
            console.log("wallet test regenerated" + account)
        })
    })

    //verifier le nombre de place pour ce film
    Movie.findOne({'idMovie':req.params.id}, function(err, movie) {
        if (movie.place > 0) {
            Account.findOne({idUser: req.session.user._id}, function(err, account) {
                if(account.wallet < req.body.price){
                    res.render('home', {errors: ['your wallet is too low !', 'transaction fail !']})
                }
                else {
                    account.wallet -= req.body.price
                    movie.place -= 1
                    console.log(movie.place)
                    account.save(function (err, updateAccount) {    
                        if (err) return console.error(err)
                        console.log('update wallet : ' + updateAccount)
                    })
                    movie.save(function (err, updateMovie) {    
                        if (err) return console.error(err)
                        console.log('update movie place : ' + updateMovie.place)
                    })
                    //générer le ticket
                    Ticket.findOne({ 'idMovie': req.params.id, 'idUser':'admin' }, function(err, ticket) {
                        let tic = ticket
                        //console.log(tic.idUser)
                        tic.idUser = req.session.user._id
                        //console.log(tic.idUser)
                        tic.price = req.body.price

                        tic.save(function(err,tik) {
                            console.log(tik)
                            res.render('user/ticket', {tic: tik, errors: ['buy confirmed !']})
                        })
                    })
                }
            })
        }
        else {
            res.render('home', {errors: ['no place !']})
        }
    })
})

app.get('/movieDetails/:id', async (req, res, next) => {
    const detailsFilm =JSON.parse( await api.findFilmById(req.params.id))
    //verifier si le film et dans la bdd, => l ajouter => le lire
    Movie.findOne({ 'idMovie': req.params.id }, function(err, movie) {
        return movie
    }).then((movie) => {
        if(!movie) {
            

            const movieName = detailsFilm.original_title
            const poster = 'https://image.tmdb.org/t/p/w500' + detailsFilm.poster_path
            const overview = detailsFilm.overview
            const vote_average = detailsFilm.vote_average
            const release_date = detailsFilm.release_date

            const genres = detailsFilm.genres
            
            let genresName = []

            for(let item in genres){
               
                genresName[item] = genres[item].name
            }
          

            let newMovies = new Movie(
                {   
                    name: movieName, 
                    idMovie: req.params.id,
                    poster: poster,
                    overview: overview,
                    note: vote_average,
                    genres: genresName,
                    release_date: release_date,
                    place:1
                }
            )
            newMovies.save(function (err, movie) {
                if (err) return console.error(err)
                console.log('movie : ' + movie)
               
                let ticket = new Ticket({ idMovie: newMovies._id, idUser: 'admin', price:0 })
                ticket.save(function (err, newTicket) {
                    if (err) return console.error(err)
                    console.log('new ticket géneration : ' + newTicket)
                })
            })            

            res.format({
                html: () => {res.render('movies/movieDetails', {movieName, poster, overview, vote_average, release_date, genresName, id: req.params.id})},
            })
        }
        else {
            const movieName = movie.name
            const poster = movie.poster
            const overview = movie.overview
            const vote_average = movie.note
            const release_date = movie.release_date
            const genres = movie.genres
            const place = movie.place

            res.format({
                html: () => {res.render('movies/movieDetails', {movieName, poster, overview, vote_average, release_date, genres, id: req.params.id, place})},
            })
        }
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
    cache.exists('user', (err, reply) => {
        if(!err) {
            if(reply === 1){
                cache.get('user', (err, reply) => {
                    Historical.findById({'_id': reply}, function(err, historical) {
                        return historical
                    }).then((historical) => {
                        if(historical === undefined) {
                          
                            res.render('movies/historical', {errors: ['No historical !']})
                        }
                        else {
                            
                            res.render('movies/historical', {historical})
                        }
                    })
                })
            }else{
                console.log('user dosen\'t exist')
            }
        }
    })    
})

module.exports = app