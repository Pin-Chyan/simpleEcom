const { generateText } = require('./util');
const puppeteer = require('puppeteer');
const axios = require('axios');
// const { response } = require('express');
// const { searchGame } = require('./util');

// test('should output name and age', () => {
//     const text = generateText("Max", 29);
//     expect(text).toBe('Max (29 years old)');
// })

// test('burnout games list check', async () => {
//     const url =`"https://www.cheapshark.com/api/1.0/games?id=152332`;
//     var response = await axios.get(url);

//     // console.log(response);
//     console.log(response);

//     const gName = searchGame("burnout");
//     // let lengthData = gName.length;

//     console.log(gName);
//     // expect(lengthData).toBe(4);
//     expect(gName).toBe('Promise { 3}');
// })

// compares the default deals page
test('Deals Page Check, First Three Content', async() => {
    const url =`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15`;
    var response = await axios.get(url);

    // console.log(response);
    // console.log(response.data[0].title);

    const browser = await puppeteer.launch({
            // have a chrome pop up show
            headless: true,
            slowMo: 80,
            // browser size
            args: ['--window-size=1920, 1080']
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/deals');

    const item0 = await page.$eval('#item-0', el => el.textContent);
    // console.log(item0);
    expect(item0).toBe((response.data[0].title));

    const item1 = await page.$eval('#item-1', el => el.textContent);
    // console.log(item1);
    expect(item1).toBe((response.data[1].title));

    const item2 = await page.$eval('#item-2', el => el.textContent);
    // console.log(item2);
    expect(item2).toBe((response.data[2].title));
}, 10000);

// 
test('Using Search Engine "Burnout" Game Check First 3 Content', async() => {
    const url =`https://www.cheapshark.com/api/1.0/games?title=burnout`;
    var response = await axios.get(url);

    // console.log(response.data[0]);
    // console.log(response.data[0].title);

    const browser = await puppeteer.launch({
            headless: true,
            slowMo: 80,
            args: ['--window-size=1920, 1080']
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/deals');
    await page.click('input#searchInput');
    await page.type('input#searchInput', 'burnout');
    await page.keyboard.press('Enter');

    const item0 = await page.$eval('#item-0', el => el.textContent);
    expect(item0).toBe(response.data[0].external);
    // console.log(item0);

    const item1 = await page.$eval('#item-1', el => el.textContent);
    // console.log(item1);
    expect(item1).toBe(response.data[1].external);

    const item2 = await page.$eval('#item-2', el => el.textContent);
    // console.log(item2);
    expect(item2).toBe(response.data[2].external);
}, 10000);


test('Detail Page, For Talos Principle', async() => {
    const url =`https://www.cheapshark.com/api/1.0/games?id=135790`;
    var response = await axios.get(url);
    var storePos = 0;

    for (const key in response.data.deals) {
        // console.log(`${key} : ${response.data.deals[key].storeID}`);
        if (response.data.deals[key].storeID == 1)
            storePos = key;
    }

    // console.log(response.data.info);
    // console.log(response.data)
    // console.log(response.data.deals[storePos]);

    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 80,
        args: ['--window-size=1920, 1080']
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/detail?gameID=135790&storeID=1');

    const title = await page.$eval('#game-title', el => el.textContent);
    expect(title).toBe(response.data.info.title);

    const retailPrice = await page.$eval('#retailPrice', el => el.textContent);
    expect (retailPrice).toBe(`$` + response.data.deals[storePos].retailPrice);

    const savingPrice = await page.$eval('#savingPrice', el => el.textContent);
    expect (savingPrice).toBe(` $` + response.data.deals[storePos].price);
}, 10000)