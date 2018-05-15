const Db = require('../db/db')

const schemaTickets = Db.mongoose.Schema({ 
  id: Db.mongoose.Schema.Types.ObjectId, 
  idUser: Db.mongoose.Schema.Types.ObjectId,
  idMovie: Db.mongoose.Schema.Types.ObjectId,
  idCinema: Db.mongoose.Schema.Types.ObjectId,
  price: Number
});

const Tickets = Db.mongoose.model('Tickets', schemaTickets);

module.exports = Tickets