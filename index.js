const express = require('express')
const config = require('./config/config')

const PORT = process.env.PORT || 8080
const app = express()
const { Db } = require('./src/db/db')
const { User } = require('./src/models/user')

app.use('/user', require('./src/controllers/userControllers'))

const db = new Db(config.db)
db.connect().then(() => {
  app.listen(PORT,() => {
    console.log('Serveur sur port :', PORT)
  })

  User.find().then((users) => {
    console.log(users)
  })
}).catch((err) => {
  console.error('Unable to connect to db', err)
})
