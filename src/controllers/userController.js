const router = require('express').Router()
const Users = require("../models/user")
const Db = require("../db/db")

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

router.post('/login', (req, res) => {
    Users.findOne({'pseudo': req.body.username}, function(err, user) {
        return user;
    }).then((user) => {
        if (!user){
            res.render('auth/signIn', { errors: ['SignIn error', 'bad login']})
        }
        else if (user.password != req.body.password) {
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
    if (req.body.username == "" || req.body.password == "") {
        res.render('auth/signIn', { message: "Input Empty !" })
        console.log("Empty");
    } else {
        setTimeout(() => {
            Users.findAll({
                where: {
                    pseudo: req.body.username
                }
            }).then((user) => {
                if (user[0] == undefined) {
                    Users.create({
                        pseudo: req.body.username,
                        password: req.body.password
                    }).then(() => {
                        return Users.findOne({
                            where: {
                                pseudo: req.body.username
                            }
                        })
                    }).then((user) => {
                        req.session.user = user
                        console.log("ajout utilisateur effectué !")
                        console.log(req.session.user.username)
                        res.redirect('/login')
                    })
                } else {
                    res.render('auth/signIn', { errors: [{message: "User Already Exists ! Login or choose another user pseudo" }]})
                }
            })
        }, 1000)
    }
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
