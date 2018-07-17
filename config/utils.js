const bcrypt = require('bcrypt')

function compare (password, passwd, done){
    bcrypt.compare(password, passwd, (err, isMatch) => {
        if(err) console.log(err)
        if(isMatch) {
          return done(null, this)
        } else {
          return done(null, false)
        }
    })
}

function crypt (pswd){
    return bcrypt.hash(pswd, 12).then((password) => {
        pswd = password
    })
}

module.exports = {compare, crypt}