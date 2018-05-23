const Db = require('../db/db')
const uuid = require('node-uuid')

const schemaHistorical = Db.mongoose.Schema({ 
  _id: { type: String, default: uuid.v4 }, 
  idMovie: Number,
  idUser: { type: String, default: uuid.v4 },
  movieName: String
});

const Historicals = Db.mongoose.model('Historicals', schemaHistorical);

module.exports = Historicals