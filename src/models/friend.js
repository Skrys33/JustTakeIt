const { Db } = require('../db/db')

const schemaFriend = new Db.Schema({ 
  idUser: Schema.Types.ObjectId,
  idFriends: [Schema.Types.ObjectId]
});

const Friends = Db.model('Friends', schemaFriend);

module.exports = { Friends }