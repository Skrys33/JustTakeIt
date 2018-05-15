const request = require('request')

class Api {
    
    static findFilmByName(film){
        request('https://api.themoviedb.org/3/search/movie?api_key=5b555b5b0b7c36a19758ce5d94001c06&language=fr&query=' + film, function (error, response, body) {            
            if (!error) {
                console.log(body)
                return body
            }else{
                return error                
            }
        })
    }
    
    static findFilmById(id){
        request('https://api.themoviedb.org/3/movie/'+id+'?api_key=5b555b5b0b7c36a19758ce5d94001c06&language=fr', function (error, response, body) {            
            if (!error) {
                return body
            }else{
                return error                
            }
        })
    }
}


module.exports = Api