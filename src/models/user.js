const Db = require('../db/db')

const schemaUsers = Db.mongoose.Schema({ 
  id: Db.mongoose.Schema.Types.ObjectId, 
  name: String,
  firstName: String,
  pseudo: String,
  passWord: String,
  idAccount: Db.mongoose.Schema.Types.ObjectId
});

const Users = Db.mongoose.model('Users', schemaUsers);

module.exports = Users

//const { Db } = require('../db/db')
//const MongoClient = require('mongodb').MongoClient;

//class User {

  //static find() {
    //return Db.collection('user').find().toArray()
  //}

//}

//
// const Admin = db.connect(url, function(err, db) {
//   if (err) throw err;
//   const user = db.createUser({
//     user: "Admin",
//     pwd: "root",
// })
//
//   console.log("Database created!");
//   db.close();
// });
//
// module.exports = Admin
