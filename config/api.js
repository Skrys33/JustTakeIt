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
        return new Promise((resolve, reject) => {
            request('https://api.themoviedb.org/3/movie/'+id+'?api_key=5b555b5b0b7c36a19758ce5d94001c06&language=fr', function (error, response, body) {            
                if (error) return reject(error)
                console.log('2')
                const data = body
                resolve(data)
            })
        })
    }
}


module.exports = Api