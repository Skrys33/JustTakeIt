const request = require('request')

class Api {
    
    static callApi(param){
        request('http://api.allocine.fr/rest/v3/'+param, function (error, response, body) {            
            if (!error) {
                return body
            }else{
                return error                
            }
        })
    }
}

Api.callApi('search?partner=QUNXZWItQWxsb0Npbuk&q=avatar&format=json')

module.exports = Api