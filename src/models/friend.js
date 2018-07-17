const Db = require('../db/db')

const schemaFriend = Db.mongoose.Schema({ 
  idUser: Db.mongoose.Schema.Types.ObjectId,
  idFriends: [Db.mongoose.Schema.Types.ObjectId]
});

const Friends = Db.mongoose.model('Friends', schemaFriend);

module.exports = Friends