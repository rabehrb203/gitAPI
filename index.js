const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = 8080 || process.env.PORT;

// Function to get manga titles
async function getMangaTitles() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://lekmanga.net/manga/");

    // Extract titles
    const titles = await page.evaluate(() => {
      const titleElements = document.querySelectorAll("h3.h5");
      const titles = [];
      titleElements.forEach((titleElement) => {
        titles.push(titleElement.textContent.trim());
      });
      return titles;
    });

    await browser.close();
    return titles;
  } catch (error) {
    throw new Error(`An error occurred: ${error}`);
  }
}

// API endpoint for getting a list of manga titles
app.get("/manga/titles", async (req, res) => {
  try {
    const mangaTitles = await getMangaTitles();
    res.json(mangaTitles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
