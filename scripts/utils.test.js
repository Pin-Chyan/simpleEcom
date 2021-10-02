const { generateText } = require('./util');
const puppeteer = require('puppeteer');
// const { searchGame } = require('./util');

// test('should output name and age', () => {
//     const text = generateText("Max", 29);
//     expect(text).toBe('Max (29 years old)');
// })

// test('burnout games list check', async () => {
//     const gName = searchGame("burnout");
//     // let lengthData = gName.length;

//     console.log(gName);
//     // expect(lengthData).toBe(4);
//     expect(gName).toBe('Promise { 3}');
// })

// compares the default deals page
test('Deals Page Check, First Three Content', async() => {
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
    expect(item0).toBe('HoPiKo');

    const item1 = await page.$eval('#item-1', el => el.textContent);
    // console.log(item1);
    expect(item1).toBe('The Talos Principle');

    const item2 = await page.$eval('#item-2', el => el.textContent);
    // console.log(item2);
    expect(item2).toBe('Candle');
}, 10000);

// 
test('Using Search Engine "Burnout" Game Check First 3 Content', async() => {
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
    expect(item0).toBe('Burnout Drift');
    // console.log(item0);

    const item1 = await page.$eval('#item-1', el => el.textContent);
    // console.log(item1);
    expect(item1).toBe('Synthwave Burnout');

    const item2 = await page.$eval('#item-2', el => el.textContent);
    // console.log(item2);
    expect(item2).toBe('Burnout Paradise Remastered');
}, 10000);


test('Detail Page, For Talos Principle', async() => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 80,
        args: ['--window-size=1920, 1080']
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/detail?gameID=135790&storeID=1');

    const title = await page.$eval('#game-title', el => el.textContent);
    expect(title).toBe('The Talos Principle');

    const retailPrice = await page.$eval('#retailPrice', el => el.textContent);
    expect (retailPrice).toBe('$39.99')

    const savingPrice = await page.$eval('#savingPrice', el => el.textContent);
    expect (savingPrice).toBe(' $3.99')
})