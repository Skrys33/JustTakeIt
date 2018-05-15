const Db= require('../db/db')

const schemaAccounts = Db.mongoose.Schema({ 
  id: Db.mongoose.Schema.Types.ObjectId, 
  idUser: Db.mongoose.Schema.Types.ObjectId,
  wallet: Number
});

const Accounts = Db.mongoose.model('Accounts', schemaAccounts);

module.exports = Accounts