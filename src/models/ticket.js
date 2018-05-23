const Db = require('../db/db')
const uuid = require('node-uuid')

const schemaTickets = Db.mongoose.Schema({ 
  _id: { type: String, default: uuid.v4 },
  idUser: Db.mongoose.Schema.Types.ObjectId,
  idMovie: Db.mongoose.Schema.Types.ObjectId,
  idCinema: Db.mongoose.Schema.Types.ObjectId,
  price: Number
});

const Tickets = Db.mongoose.model('Tickets', schemaTickets);

module.exports = Tickets