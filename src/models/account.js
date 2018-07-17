const Db= require('../db/db')
const uuid = require('node-uuid')

const schemaAccounts = Db.mongoose.Schema({ 
  _id: { type: String, default: uuid.v4 }, 
  idUser: { type: String, default: uuid.v4 },
  wallet: Number
});

const Accounts = Db.mongoose.model('Accounts', schemaAccounts);

module.exports = Accounts