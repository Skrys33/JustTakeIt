const express = require('express')
const router = express.Router()
const api = require('../../config/api')

router.get('/search/:name', async (req, res, next) => {
    const films = JSON.parse(await api.findFilmByName(req.params.name))
    res.format({
        html: () => {res.render('movies/search', {films})},
   })
});

router.get('/search', (req, res, next) => {
    res.format({
        html: () => {res.render('movies/search')},
   })
});

module.exports = router