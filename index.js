const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080
const app = express()

const { Db } = require('./src/db/db')
const { Users } = require('./src/models/user')
const { Movies } = require('./src/models/movie')
const { User } = require('./src/models/account')
const { User } = require('./src/models/historical')
const { User } = require('./src/models/friend')
const { User } = require('./src/models/ticket')
const { User } = require('./src/models/cinema')
const config = require('./config/config')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

app.set('views', path.join(__dirname, 'src/views/'))
app.set('view engine', 'twig')

app.use(require('./src/controllers/userControllers'))

app.all('/', (req, res, next) => {
  res.redirect('/login')
})

app.listen(PORT,() => {
  console.log('Serveur sur port :', PORT)
})

// const db = new Db(config.db)
// db.connect().then(() => {
//   app.listen(PORT,() => {
//     console.log('Serveur sur port :', PORT)
//   })

//   User.find().then((users) => {
//     console.log(users)
//   })


// }).catch((err) => {
//   console.error('Unable to connect to db', err)
// })
