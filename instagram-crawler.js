const fs = require("fs")
const puppet = require("puppeteer")


function checkSelector(selector, page) {
    try {
        page.$(selector, {timeout: 2000})
    } catch {
        console.log("Selector " + selector + " didn't appear!")
    }
}

async function startCrawl() {
    const browser = await puppet.launch({headless: false})

    const page = await browser.newPage()

    await page.goto("https://instagram.com/", {waitUntil: "networkidle0"})
    
    // Login into Instagram
    const userInput = "input[name='username']"
    const pwInput = "input[name='password']"
    await page.type(userInput, "botterpython@gmail.com")
    await page.type(pwInput, "MPsagw67G372f6V")
    await page.waitForTimeout(250)
    await page.keyboard.press("Enter")
    
    // Go to the explore tabs
    await page.waitForNavigation()
    await page.goto("https://instagram.com/explore/tags/prabowo", {waitUntil: "networkidle0"})
    console.log("Logged In")

    // Post Selector
    const postSelector = "article > div:nth-child(3) > div > div.Nnq7C.weEfm > div:nth-child(2)"
    const postContentSelector = "div.C4VMK > div.MOdxS > span"
    const postAuthorSelector = "div.C4VMK > h2 > div > span > a"
    const postCommentSelector = ""
    const dateTimeSelector = "div.eo2As > div.NnvRN > div > a > div > time"
    const likeCountSelector = "div.eo2As > section.EDfFK.ygqzn > div > div > div > a > div"
    
    const table = {
        row: []
    }

    // Click Post
    await page.click(postSelector, {delay: 100})
    await page.waitForTimeout(1000)

    // Fetch Post Author, Content
    await page.waitForSelector(postContentSelector)
    const content = await page.$eval(postContentSelector, elm => elm.textContent).catch(() => console.log("selector not found"))
    const author = await page.$eval(postAuthorSelector, elm => elm.textContent).catch(() => console.log("selector not found"))
    const dateTime = await page.$eval(dateTimeSelector, elm => elm.dateTime).catch(() => console.log("selector not found"))
    // await checkSelector(likeCountSelector, page)
    const likeCount = await page.$eval(likeCountSelector, elm => elm.textContent.split(" ")[0]).catch(() => console.log("selector not found"))
    

    // Write row
    const item = {
        author: author,
        content: content,
        date: dateTime,
        like: likeCount,
    }

    // Push row
    table.row.push(item)

    // writeFile method
    fs.writeFileSync("data.json", JSON.stringify(table))

    // Screenshot to see if everything is fine
    await page.screenshot({path: "instagram.png"})

    await browser.close()
}

startCrawl()