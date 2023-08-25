const request = require('request')



const fetchQuotes = async (req, res) => {
    request.get({
        url: 'https://api.api-ninjas.com/v1/quotes?category=movies',
        headers: {
            'X-Api-Key': 'G3hn10lPFgf8maNUbkMK0g==QcSwIX30oztFmDiB'
        },
    }, function (error, response, body) {
        if (error) return console.error('Request failed:', error);
        else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
        else {
            const result = JSON.parse(body);
            res.send(result)
        }
    });
}


module.exports = { fetchQuotes }