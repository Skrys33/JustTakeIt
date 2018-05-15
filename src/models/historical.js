const { Db } = require('../db/db')

const schemaHistorical = new Db.Schema({ 
  id: Schema.Types.ObjectId, 
  idUser: Schema.Types.ObjectId,
  movieName: String
});

const Historicals = Db.model('Historicals', schemaHistorical);

module.exports = { Historicals }