const { Db } = require('../db/db')

const schemaTickets = new Db.Schema({ 
  id: Schema.Types.ObjectId, 
  idUser: Schema.Types.ObjectId,
  idMovie: Schema.Types.ObjectId,
  idCinema: Schema.Types.ObjectId,
  price: Number
});

const Tickets = Db.model('Tickets', schemaTickets);

module.exports = { Tickets }