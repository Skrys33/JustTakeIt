const Db = require('../db/db')

const schemaHistorical = Db.mongoose.Schema({ 
  id: Db.mongoose.Schema.Types.ObjectId, 
  idUser: Db.mongoose.Schema.Types.ObjectId,
  movieName: String
});

const Historicals = Db.mongoose.model('Historicals', schemaHistorical);

module.exports = Historicals