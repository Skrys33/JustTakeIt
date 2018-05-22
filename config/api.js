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
            request('https://api.themoviedb.org/3/movie/'+id+'?api_key=5b555b5b0b7c36a19758ce5d94001c06&language=fr', function (error, response, body) {            
                if (error) return reject(error)
                resolve(body)
            })
        })
    }
    
    static getTopMovies(){
        return new Promise((resolve, reject) => {
            const currentDate = new Date()
            request('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5b555b5b0b7c36a19758ce5d94001c06&language=fr', function (error, response, body) {            
                if (error) return reject(error)
                resolve(body)
            })
        })
    }
    
      static getMovieReleaseMonth(){
            return new Promise((resolve, reject) => {
                const currentDate = new Date()
                const lastDate = currentDate
                lastDate.setMonth(currentDate.getMonth() - 1)
                request('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte='+lastDate.getFullYear()+'-'+lastDate.getMonth()+'-'+lastDate.getDate()+'&primary_release_date.lte='+currentDate.getFullYear()+'-'+currentDate.getMonth()+'-'+currentDate.getDate()+'&api_key=5b555b5b0b7c36a19758ce5d94001c06&language=fr', function (error, response, body) {            
                    if (error) return reject(error)
                    resolve(body)
                })
            })
        }
    
    
}

module.exports = Api