const redis =  require('redis')
const client = redis.createClient()

client.on('connect', function() {
    console.log('connected to Redis !');
});

client.on('error', function (err) {
    console.log('error event - ' + client.host + ':' + client.port + ' - ' + err);
});

module.exports = client