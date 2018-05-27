const router = require('express').Router()
const Users = require("../models/user")
const Db = require("../db/db")
const utils = require('../../config/utils')
const cache = require('../redis-cache/cache')
const redis = require('redis')
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

    Users.findOne({'pseudo': req.body.username}, (err, user) => {
        return user
    }).then((user) => {
        
        if (!user){
            res.render('auth/signIn', { errors: ['SignIn error', 'bad login']})
        }
        else if (user.password != req.body.password) {
            res.render('auth/signIn', { errors: ['SignIn error', 'bad password']})
        }
        else {
            //save session in reddit
            cache.get('user', function(err, result) {
                console.log(result); // this is a string
                //console.log(req.session.user.pseudo)
                res.render('home')
              });
           
        }
    })
})

router.get('/register', (req, res, next) => {
    res.format({
        html: () => {res.render('auth/signUp')},
   })
})

router.post('/register', (req, res, next) => {
    //console.log(req.body.username)
    Users.findOne({ 'pseudo': req.body.username }, (err, user) =>  {
        //console.log(user + ' in findOne')
        return user;
    }).then((user) => {
        if(!user){
            //save session in reddit
            //console.log(user + ' then findOne')
            let newUser = new Users({ pseudo: req.body.username, password: req.body.password})
            newUser.save(function (err, newUser) {
                if (err) return console.error(err)
                //console.log('user : ' + newUser)
            })
            cache.set('user', newUser._id, redis.print)
            console.log("ajout utilisateur effectué !")
            req.session.user = newUser
            console.log(req.session.user)
            res.format({
                html: () => {res.redirect('/home')},
                json: () => {res.send({newUser})}
            })
        }
        else if (user.pseudo === req.body.username){
            res.format({
                html: () => {res.render('auth/signUp', { errors: ['SignUp error', 'Pseudo already exist'] })},
                json: () => {res.send({error:'SignUp error'})}
            })
            
        }
        else{
            res.render('auth/signUp', { errors: ['SignUp error', 'Error Data Base'] })
        }
    })
})

router.get('/wallet', (req, res, next) => {
    res.format({
        html: () => {res.render('user/wallet')},
   })
})

router.post('/wallet', (req, res) => {
    
})

router.get('/home', (req,res) => {
    cache.exists('user',function(err,reply) {
        if(!err) {
         if(reply === 1) {
          console.log("Key exists");
          res.render('home')
         } else {
            Users.findOne({'pseudo': req.session.user.pseudo}, function(err, user) {
                cache.set('user', user._id, redis.print)
                console.log("log user after home" + user)
            })
            res.render('home')
         }
        }
    })
})

router.get('/account', (req, res) => {
    //console.log(req.session.user)
    let User = req.session.user
    cache.exists('user', (err, reply) => {
        if(!err) {
            if(reply === 1){
                console.log('Key exists')
                res.render('user/account', {User})
                res.render('home')
            }else{
                Users.findOne({'pseudo': req.session.user.pseudo}, function(err, user) {
                cache.set('user', User._id, redis.print)
                })
            }
        }
    })
    
})

router.get('/ticket', (req, res) => {

})

router.post('/account', (req,res) => {
    Users.findById(req.body.id,  (err, user) => {
        if (err) return handleError(err);
      
        user.name = req.body.name
        user.firstName = req.body.firstName
        user.pseudo = req.body.username
        user.password = req.body.password
        
        user.save( (err, update) => {
          if (err) return handleError(err)
          console.log("profile updated !" + update)
        //   req.session.user = update
        //   console.log("updat session in save : " + req.session.user)
        })
        req.session.user = user
        //console.log("updat session after save : " + req.session.user)
    }).then(() => {
        let User = req.session.user
        res.render('user/account', {User, errors: ['Profile updated !']})
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log("user logged out.")
    });
    res.redirect('/auth/signIn');
})

module.exports = router