const router = require('express').Router()
const Users = require("../models/user")

// function checkSignIn(req, res) {
//     if (req.session.user) {
//         console.log('from userController : login verif ok : '+req.session.user);
//         next();     //If session exists, proceed to page
//     } else {
//         console.log('from userController : login verif KO : '+req.session.user);
//         res.redirect('/user', { message: 'Not logged in !' })
//     }
// }

router.get('/login', (req, res) => {
    res.render('auth/signIn')
})

router.post('/login', (req, res, next) => {
    Users.findOne({'pseudo': res.body.username}, function(err, user) {
        return user;
    }).then((user) => {
        if (user.pseudo == req.body.username){
            res.render('auth/signIn', { errors: ['SignIn error', 'bad login']})
        }
        else if (user.passWord != req.body.password) {
            res.render('auth/signIn', { errors: ['SignIn error', 'bad password']})
        }
        else {
            //save session in reddit
            req.session.user = user
            console.log(req.session.user.pseudo)
            res.render('home')
        }
    })
})

router.get('/register', (req, res, next) => {
    res.format({
        html: () => {res.render('auth/signUp')},
   })
})

router.post('/register', (req, res, next) => {
    Users.findOne({ 'pseudo': req.body.username }, function (err, user) {
        return user;
    }).then((user) => {
        if(user.pseudo == req.body.username)
            res.render('auth/signUp', { errors: ['SignUp error', 'Pseudo already exist'] })
        else{
            req.session.user = user
            //save session in reddit
            let newUser = new Users({ pseudo: res.body.username }, { passWord: req.body.password })
            newUser.save(function (err, newUser) {
                if (err) return console.error(err);
            });
            console.log("ajout utilisateur effectué !")
            console.log(req.session.user.pseudo)
            res.render('home')
        }
    })
})

router.get('/wallet', (req, res, next) => {
    res.format({
        html: () => {res.render('wallet')},
   })
})

router.post('/wallet', (req, res, next) => {
    
})

router.get('/logout', (req, res) => {
    req.session.destroy(function () {
        console.log("user logged out.")
    });
    res.redirect('/auth/signIn');
})

module.exports = router
