const request = require('request')

class Api {
    
    static callApi(film){
        request('https://api.themoviedb.org/3/search/movie?api_key=5b555b5b0b7c36a19758ce5d94001c06&language=fr&query=' + film, function (error, response, body) {            
            if (!error) {
                console.log(body)
                return body
            }else{
                return error                
            }
        })
    }
}

// Usage :
//Api.callApi('Avenger')

module.exports = Api