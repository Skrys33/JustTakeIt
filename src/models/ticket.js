const Db = require('../db/db')
const uuid = require('node-uuid')

const schemaTickets = Db.mongoose.Schema({ 
  _id: { type: String, default: uuid.v4 },
  idUser: { type: String, default: uuid.v4 },
  idMovie: Number,
  price: Number
});

const Tickets = Db.mongoose.model('Tickets', schemaTickets);

module.exports = Tickets