var express = require('express'),
    request = require('request'),
    igdb    = require('igdb-api-node').default,
    client  = igdb('ad95bcfb65a9d935343495c7f1da6217'),
    app     = express();

var data;

client.games({
    fields: '*', // Return all fields
    limit: 5, // Limit to 5 results
    offset: 15 // Index offset for results
}).then(response => {
    data = response;
}).catch(error => {
    throw error;
});

app.get('/', (request, response) => {
    return response.send(data)
});

app.use(express.static(__dirname + '/dist'));

app.all('*', (request, response) => {
   response.status(200).sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running!!!!");
});
