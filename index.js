const express = require('express')
const session = require('express-session')
const path = require('path');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080
const app = express()
//const cookieParser = require('cookie-parserr')

const Db = require('./src/db/db')
const Users = require('./src/models/user')
const Movies = require('./src/models/movie')
const Accounts = require('./src/models/account')
const Historicals = require('./src/models/historical')
const Friends = require('./src/models/friend')
const Tickets = require('./src/models/ticket')
const Cinemas = require('./src/models/cinema')
const config = require('./config/config')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(session({ secret: "azerty" }))
//app.use(cookieParser())

app.set('views', path.join(__dirname, 'src/views/'))
app.set('view engine', 'twig')

app.all('/', (req, res, next) => {
  res.redirect('/login')
})

app.listen(PORT,() => {
  console.log('Serveur sur port :', PORT)
})
app.use(require('./src/controllers/userController'))
app.use(require('./src/controllers/movieController'))