const request = require('request')

class Api {

    static findFilmByName(name){
        return new Promise((resolve, reject) => {
            request('https://api.themoviedb.org/3/search/movie?api_key=5b555b5b0b7c36a19758ce5d94001c06&language=fr&query=' + name, function (error, response, body) {            
                if (error) return reject(error)
                resolve(body)
            })
        })
    }

    static findFilmById(id){
        return new Promise((resolve, reject) => {
            // exemple id = 1771
            request('https://api.themoviedb.org/3/movie/'+id+'?api_key=5b555b5b0b7c36a19758ce5d94001c06&language=fr', function (error, response, body) {            
                if (error) return reject(error)
                resolve(body)
            })
        })
    }
}

module.exports = Api