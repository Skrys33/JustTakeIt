const Db = require('../db/db')
const uuid = require('node-uuid')

const schemaCinema = Db.mongoose.Schema({ 
  _id: { type: String, default: uuid.v4 },
  postalCode: Number
});

const Cinemas = Db.mongoose.model('Cinemas', schemaCinema);

module.exports = Cinemas