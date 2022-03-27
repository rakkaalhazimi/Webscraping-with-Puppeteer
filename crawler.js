const puppet = require("puppeteer");

(async () => {
    // Headless will use english ver of google while non headless will use the local language ver
    const browser = await puppet.launch({ headless: true });
    // const page = await browser.newPage();
    // await page.goto("http://example.com");
    
    const page2 = await browser.newPage();
    await page2.goto("https://google.com");
    const searchBarSelector = "input[title='Search']";
    // await page.screenshot({ path: "example.png"});
    // await page2.click(searchBarSelector);
    await page2.type(searchBarSelector, "kucing");
    await page2.keyboard.press("Enter");
    await page2.waitForNavigation();

    // Result selector
    const resultSelector = "h3";
    await page2.waitForSelector(resultSelector);

    // // Single selection
    // let element = await page2.$(resultSelector);
    // let value = await page2.evaluate(el => el.textContent, element);
    // console.log(value);

    // Multiple selections
    // let elements = await page2.$$(resultSelector);
    // let values = await page2.evaluate(resultSelector => {
    //     let anchors = Array.from(document.querySelectorAll(resultSelector));
    //     return anchors.map((anchor) => {
    //         const title = anchor.textContent;
    //         return title;
    //         }
    //     )
    // }
    // , resultSelector)
    // console.log(values);

    // Multiple selections with for loop
    // let element = await page2.$$(resultSelector);
    // for (const elm of element) {
    //     const title = await page2.evaluate(elm => elm.textContent, elm);
    //     console.log(title);
    // }

    // Multiple selections with $$eval
    // let elements = await page2.$$eval(resultSelector, elms => Array.from(elms).map((x)=>x.textContent))
    // console.log(elements.join("\n"))
    // await page2.screenshot({ path: "google.png"});
    
    await browser.close();
})();