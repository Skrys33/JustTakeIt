const request = require('request')

class Api {
    
    static callApi(url){
        request(url, function (error, response, body) {
            
            if (!error) {
                console.log(body)
            }else{
                console.log(error)                
            }
        })
    }
}

Api.callApi('http://api.allocine.fr/rest/v3/search?partner=QUNXZWItQWxsb0Npbuk&filter=movie,theater,person,news,tvseries&count=5&page=1&q=avatar&format=json')

module.exports = Api