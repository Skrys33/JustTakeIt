const Db = require('../db/db')
const uuid = require('node-uuid')

const schemaUsers = Db.mongoose.Schema({ 
  _id: { type: String, default: uuid.v4 },
  name: String,
  firstName: String,
  pseudo: String,
  password: String,
  idAccount: Db.mongoose.Schema.Types.ObjectId
});

const Users = Db.mongoose.model('Users', schemaUsers);

module.exports = Users