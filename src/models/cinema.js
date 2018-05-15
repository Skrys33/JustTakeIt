const Db = require('../db/db')

const schemaCinema = Db.mongoose.Schema({ 
  id: Db.mongoose.Schema.Types.ObjectId, 
  postalCode: Number
});

const Cinemas = Db.mongoose.model('Cinemas', schemaCinema);

module.exports = Cinemas