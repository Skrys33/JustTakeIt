const router = require('express').Router()
const Users = require("../models/user")
const Tickets = require('../models/ticket')
const Db = require("../db/db")
const utils = require('../../config/utils')
const cache = require('../redis-cache/cache')
const redis = require('redis')


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
            req.session.user = user
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

    Users.findOne({ 'pseudo': req.body.username }, (err, user) =>  {
     
        return user;
    }).then((user) => {
        if(!user){
           
            let newUser = new Users({ pseudo: req.body.username, password: req.body.password})
            newUser.save(function (err, newUser) {
                if (err) return console.error(err)
              
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
    if(req.session.user === undefined)
        res.send('Vous n\'êtes pas connecter')

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
   
    let User = req.session.user
    cache.exists('user', (err, reply) => {
        if(!err) {
            if(reply === 1){
                console.log('Key exists')
                res.render('user/account', {User})
            }else{
                Users.findOne({'pseudo': req.session.user.pseudo}, function(err, user) {
                cache.set('user', User._id, redis.print)
                })
            }
        }
    })
    
})

router.get('/ticket', (req, res) => {
    Tickets.find({ 'idUser':req.session.user._id }, function(err, tickets) {
      
    })
    .populate('idMovie')
    .exec(function(err, tickets) {
        console.log(tickets)
        if(tickets[0] == undefined){
            res.render('user/ticket', { errors: ['no ticket !'] })
        }
        
        else {
            console.log(tickets)
            console.log(tickets[0].idMovie)
        }
    })
})

router.post('/account', (req,res) => {
    Users.findById(req.body.id,  (err, user) => {
        if (err) return handleError(err);
      
        user.name = req.body.name
        user.firstName = req.body.firstName
        user.pseudo = req.body.username
        user.password = req.body.password
        user.wallet = req.body.wallet
        console.log(user)
        
        user.save( (err, update) => {
          if (err) return handleError(err)
          console.log("profile updated !" + update)
   
        })
        req.session.user = user
       
    }).then(() => {
        let User = req.session.user
        res.render('user/account', {User, errors: ['Profile updated !']})
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log("user logged out.")
    });
    res.redirect('/login');
})

module.exports = router