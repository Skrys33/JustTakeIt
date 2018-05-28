const Db = require('../db/db')
const uuid = require('node-uuid')

const schemaMovie = Db.mongoose.Schema({ 
  _id: { type: String, default: uuid.v4 }, 
  name: String,
  idMovie: { type: Number, ref:'Tickets' },
  poster: String,
  overview: String,
  note: Number,
  genres: [String],
  release_date: String,
  place: Number
});

const Movies = Db.mongoose.model('Movies', schemaMovie);

module.exports = Movies