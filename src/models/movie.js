const { Db } = require('../db/db')

const schemaMovie = new Db.Schema({ 
  id: Schema.Types.ObjectId, 
  name: String,
  director: String,
  description: String,
  critical: String,
  note: Number
});

const Movies = Db.model('Movies', schemaMovie);

module.exports = { Movies }


// const bd = require('')
// const api = require('../../config/api')

// class Movie {

//     constructor(){

//     }

//     static findOne(){}

//     static findAll(){}
    
// }

// module.exports = Movie