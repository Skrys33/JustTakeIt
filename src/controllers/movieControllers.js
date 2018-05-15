const express = require('express')
const router = express.Router()
const Movies= = require("../models/movie")
const api = require("../config/api")
const bodyParser = require('body-parser')
app.use(bodyParser.json())
 
router.get('/movieDetails', (req, res, next) => {
    setTimeout(() => {
        const detailsFilm = api.findFilmById(req.params.id)
        const movieName = detailsFilm[2][1]
        }, 1000)
    res.format({
        html: () => {res.render('movieDetails', {movieName})},
   })
})

module.exports = router