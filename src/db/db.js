const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movies');
const db = mongoose.connection;
db.on('error', () => console.error('connection error !'));
db.once('open', () => console.log('connection mongodb success !'));

module.exports = { mongoose }

// const MongoClient = require('mongodb').MongoClient;

// let dbSingleton = null

// class Db {

//   constructor (options) {
//     this.client = null
//     this.options = {
//       url: null,
//       name: 'default',
//       ...options
//     }
//     dbSingleton = this
//   }

//   get adapter() {
//     return this.client.db(this.options.name)
//   }

//   connect () {
//     return new Promise((resolve, reject) => {
//       MongoClient.connect(this.options.url, (err, mongoClient) => {
//         if (err) {
//           return reject(err);
//         }
//         console.log("successfully connected to the database");
//         this.client = mongoClient
//         console.log("Database created!");
//         resolve(mongoClient)
//       });
//     })
//   }

//   static getInstance () {
//     return dbSingleton
//   }

//   static collection (name) {
//     return dbSingleton.adapter.collection(name)
//   }
// }

// module.exports = { Db }
