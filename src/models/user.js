const { Db } = require('../db/db')
const MongoClient = require('mongodb').MongoClient;

class User {

  static find() {
    return Db.collection('user').find().toArray()
  }

}

module.exports = { User }

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
