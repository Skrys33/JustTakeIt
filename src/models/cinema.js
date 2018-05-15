const { Db } = require('../db/db')

const schemaCinema = new Db.Schema({ 
  id: Schema.Types.ObjectId, 
  postalCode: Number
});

const Cinemas = Db.model('Cinemas', schemaCinema);

module.exports = { Cinemas }