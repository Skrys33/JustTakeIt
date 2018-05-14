module.exports = {
  db: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017',
    name: process.env.MONGO_DB_NAME || 'just_take_it'
  }
}
