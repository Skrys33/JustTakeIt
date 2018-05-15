const express = require('express')
const router = express.Router()

router.get('/search', (req, res, next) => {
    res.format({
        html: () => {res.render('movies/search')},
   })
});

module.exports = router