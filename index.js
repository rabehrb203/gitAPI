const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 8080 || process.env.PORT;

const jsonDir = path.join(__dirname, "json_data");

// API endpoint for getting a list of manga titles and links
app.get("/manga/titles", async (req, res) => {
  try {
    // Read titles.json file
    const titlesData = fs.readFileSync(path.join(jsonDir, "titles.json"));
    const titles = JSON.parse(titlesData);
    res.json(titles);
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error}` });
  }
});

// API endpoint for getting details of a specific manga
app.get("/manga/details/:manga_link", async (req, res) => {
  const manga_link = req.params.manga_link;

  try {
    // Read manga details from corresponding JSON file
    const detailsData = fs.readFileSync(
      path.join(jsonDir, manga_link, `manga_details_${manga_link}.json`)
    );
    const details = JSON.parse(detailsData);
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error}` });
  }
});

// API endpoint for getting chapters of a specific manga
app.get("/manga/chapters/:manga_link", async (req, res) => {
  const manga_link = req.params.manga_link;

  try {
    // Read manga chapters from corresponding JSON file
    const chaptersData = fs.readFileSync(
      path.join(jsonDir, manga_link, `manga_chapters_${manga_link}.json`)
    );
    const chapters = JSON.parse(chaptersData);
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error}` });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
