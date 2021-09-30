// const axios = require('axios');

// const { default: axios } = require("axios");

function toggleFilter() {
    var filterBlock = document.getElementById("filter");
    var arrow = document.getElementById('arrow');
    if (filterBlock.style.display === "none") {
        filterBlock.style.display = "block";
        console.log("show");
        arrow.classList.remove("fa-arrow-up");
        arrow.classList.add("fa-arrow-down");
    } else {
        console.log("hide");
        filterBlock.style.display = "none";
        arrow.classList.remove("fa-arrow-down");
        arrow.classList.add("fa-arrow-up");
    }
}

async function search() {
    var items = document.getElementById("items");
    var message = document.getElementById("searchInput").value;
    var i = 0;

    const games = await axios.get("https://www.cheapshark.com/api/1.0/games?title=" + message);
    // console.log(message);
    // console.log(games.data);
    items.innerHTML = "";

    // console.log(games.data.length);
    while(i < games.data.length && i <= 99) {
        var storeID = 0;
        var ogPrice = 0;
        const store = await axios.get(`https://www.cheapshark.com/api/1.0/games?id=${games.data[i].gameID}`)
        // console.log(store.data.deals);

        store.data.deals.forEach(game => {
            // console.log(game.price);
            // console.log(games.data[i].cheapest);
            if (game.price == games.data[i].cheapest)
                storeID = game.storeID;
                ogPrice = game.retailPrice;
        });

        // console.log(storeID);
        // items.innerHTML += `<div class="p-2 flex-fill bd-highlight w-33 mt-5 bord-shadow"><h5 class="text-overflow">Brothers: A Tale of Two Sons</h5><p><span class="line-through">$14.99</span> $2.99</p><a class="btn btn-outline-dark" href="/detail?gameID=101447&amp;storeID=1">View More</a></div>`;
        if (ogPrice > games.data[i].cheapest) {
            items.innerHTML += `<div class=\"p-2 flex-fill bd-highlight w-33 mt-5 bord-shadow sale\"><h5 class=\"text-overflow\">${games.data[i].external}</h5><p><span class="line-through">&#36;${ogPrice}</span><span> &#36;${games.data[i].cheapest}</span></p><a class=\"btn btn-outline-dark\" href=\"/detail?gameID=${games.data[i].gameID}&amp;storeID=${storeID}\">View More</a></div>`;
        } else {
            items.innerHTML += `<div class=\"p-2 flex-fill bd-highlight w-33 mt-5 bord-shadow nosale\"><h5 class=\"text-overflow\">${games.data[i].external}</h5><p><span> &#36;${games.data[i].cheapest}</span></p><a class=\"btn btn-outline-dark\" href=\"/detail?gameID=${games.data[i].gameID}&amp;storeID=${storeID}\">View More</a></div>`;
        }

        
        i++;
    }

    // games.data.forEach(game => {
    //     const store = await axios.get(`https://www.cheapshark.com/api/1.0/games?id=${game.gameID}`)
    //     items.innerHTML += `<div class=\"p-2 flex-fill bd-highlight w-33 mt-5 bord-shadow\"><h5 class=\"text-overflow\">${game.external}</h5><p><span class=\"line-through\">$39.99</span> $3.99</p><a class=\"btn btn-outline-dark\" href=\"/detail?gameID=135790&amp;storeID=1\">View More</a></div>`;
        
    //     console.log(store);
    // });
}

function onsale() {
    const onsale = document.getElementById("customCheck");
    // const saleOnly = document.getElementsByClassName("sale");
    const noSaleOnly = document.getElementsByClassName("nosale");
    
    
    if (onsale.checked)
    {
        document.documentElement.style.setProperty("--is-on-sale", "none", "important");
        console.log("checked");
    } else {
        document.documentElement.style.setProperty("--is-on-sale", "block", "important");
        console.log("unchecked");
    }
}