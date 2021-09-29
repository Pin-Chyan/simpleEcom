const express = require('express');
const path = require('path');

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

app.get('/Deals', function(req, res) {
    let items = [
        {
            id: 1,
            title: "Batman - Deluxe Edition",
            price: 60,
            discount: 16,
            img: "https://cdn.akamai.steamstatic.com/steam/apps/267490/capsule_616x353.jpg?t=1461103058"
        },
        {
            id: 2,
            title: "NFS Most Wanted 2005",
            price: 60,
            discount: 12,
            img: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/need-for-speed-most-wanted-2005/f/fe/NFS-most-wanted-for-pc.jpg"
        },
        {
            id: 3,
            title: "Rust",
            price: 60,
            discount: 30,
            img: "https://i.ytimg.com/vi/KxjEUkBeipw/maxresdefault.jpg",
        },
        {
            id: 4,
            title: "Grand Theft Auto V",
            price: 60,
            discount: 50,
            img: "https://steamrip.com/wp-content/uploads/2021/05/GTA-V-Free-Download-Torrent-SteamRip.jpg"
        },
        {
            id: 5,
            title: "Valheim",
            price: 60,
            discount: 18,
            img: "https://images.drivereasy.com/wp-content/uploads/2021/02/valheim-featured.jpg"
        },
        {
            id: 6,
            title: "CS:GO",
            price: 60,
            discount: 19,
            img: "https://www.dexerto.com/wp-content/uploads/2020/11/CSGO-Operation-10-Details.jpg"
        },
        {
            id: 7,
            title: "Portal",
            price: 60,
            discount: 20,
            img: "https://thenerdstash.com/wp-content/uploads/2016/08/portal.jpg"
        },
        {
            id: 8,
            title: "Deathloop",
            price: 60,
            discount: 65,
            img: "https://2game.com/wp/wp-content/uploads/2021/05/deathloop.jpg"
        },
        {
            id: 9,
            title: "Hades",
            price: 60,
            discount: 24,
            img: "https://cdn.akamai.steamstatic.com/steam/apps/1145360/capsule_616x353.jpg?t=1624463563"
        },
    ]
    res.render('deals', {
        title: "Deals",
        items: items
    })
})

app.get('/Detail', function(req, res) {
    res.render('detail', {
        title: "Details",
        store: "BT Games",
        id: 1,
        game: "Batman - Deluxe Edition",
        price: 60,
        discount: 16,
        img: "https://cdn.akamai.steamstatic.com/steam/apps/267490/capsule_616x353.jpg?t=1461103058"
    })
})


// Start Server
app.listen(3000, function() {
    console.log('Sever started on port 3000...');
});