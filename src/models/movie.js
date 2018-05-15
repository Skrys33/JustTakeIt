const Db = require('../db/db')

const schemaMovie = Db.mongoose.Schema({ 
  id: Db.mongoose.Schema.Types.ObjectId, 
  name: String,
  director: String,
  description: String,
  critical: String,
  note: Number
});

const Movies = Db.mongoose.model('Movies', schemaMovie);

module.exports = Movies


// const bd = require('')
// const api = require('../../config/api')

// class Movie {

//     constructor(){

//     }

//     static findOne(){}

//     static findAll(){}
    
// }

// module.exports = Movie