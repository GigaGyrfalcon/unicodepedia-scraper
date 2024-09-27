import puppeteer from "puppeteer";
import fs from "fs";

import characters from "./list";

// Base URL of the website
const baseUrl = "https://www.unicodepedia.com/";

const scrapeSearchForm = async (symbol: string) => {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch({ headless: true }); // Set to false to see the browser in action
  const page = await browser.newPage();

  // Navigate to the page with the form
  await page.goto(baseUrl, { waitUntil: "networkidle2" });

  // Find the search input element and type in the text
  await page.type("#searchBlockInput", symbol);

  // Press 'Enter' to submit the form
  await page.keyboard.press("Enter");

  // Wait for the page to navigate
  await page.waitForSelector("#conversion");

  // Get the current URL after form submission
  const currentUrl = page.url();

  // Parse the table from the new page
  const unicode = await page.evaluate(() => {
    // Adjust the selector based on the table structure
    const container = document.querySelector("#conversion"); // Replace with the actual table selector if needed
    const table = container?.querySelector("table"); // Replace with the actual table selector if needed
    if (!table) return [];

    // Extract rows from the table
    const rows = Array.from(table.querySelectorAll("tr"));

    // Map over the rows and extract columns (cells)
    return rows
      .map((row) => {
        const cells = Array.from(row.querySelectorAll("td"));
        if (cells[0].textContent === "Javascript (UTF-16)") {
          return cells[1].innerText.trim().replace(/\\\\u/g, "\\u");
        }
      })
      .filter(Boolean)
      .toString();
  });

  // Optionally, you can close the browser if you don't need further interaction
  await browser.close();

  return {
    unicode: unicode,
    currentUrl,
  };
};

const scrapeUnicodeCharacters = async () => {
  const standardUnicodeSymbols = [];

  for (const element of characters) {
    console.log("Scraping for:", element);
    const data = await scrapeSearchForm(element).catch(console.error);
    standardUnicodeSymbols.push(data);
  }

  const jsonData = JSON.stringify(standardUnicodeSymbols, null, 2);

  fs.writeFileSync("unicode.json", jsonData, "utf-8");

  console.log("Standard Unicode Symbols:", standardUnicodeSymbols);
};

// Uncomment the line below to run the scraper
scrapeUnicodeCharacters();
