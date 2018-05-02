const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()
const MongoClient = require('./src/db/db')

app.use('/user', require('./src/controllers/userControllers'))



app.listen(PORT,() => {
  console.log('Serveur sur port :', PORT)
})
