const { Db } = require('../db/db')

const schemaAccounts = new Db.Schema({ 
  id: Schema.Types.ObjectId, 
  idUser: Schema.Types.ObjectId,
  wallet: Number
});

const Accounts = Db.model('Accounts', schemaAccounts);

module.exports = { Accounts }