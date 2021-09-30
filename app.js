const express = require('express');
const path = require('path');
const axios = require('axios');

// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Gaming Store'
    });
});

app.get('/Deals', async function(req, res) {
    const response = await axios.get("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15");
    console.log(response);
   
    res.render('deals', {
        title: "Deals",
        items: response.data
    })
})

app.get('/Detail', async function(req, res) {
    const gameID = req.query.gameID;
    const storeID = req.query.storeID;
    console.log(gameID);

    const games = await axios.get("https://www.cheapshark.com/api/1.0/games?id=" + gameID);
    const stores = await axios.get("https://www.cheapshark.com/api/1.0/stores");
    console.log(games.data.deals);
    console.log(stores);

    res.render('detail', {
        title: "Details",
        gameID: gameID,
        storeID: storeID,
        stores: stores.data,
        games: games.data.deals,
        info: games.data.info
    })
})


// Start Server
app.listen(3000, function() {
    console.log('Sever started on port 3000...');
});