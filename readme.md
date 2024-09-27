# Unicode Symbol Scraper

This project is a web scraper built with Puppeteer that automates the process of retrieving Unicode symbols from [UnicodePedia](https://www.unicodepedia.com/). The script takes a list of characters as input and scrapes their corresponding Unicode values.

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/)
- npm (which comes with Node.js)

## Setup

1. Clone the repository or download the source code:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd machinedependentcharacters
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## How It Works

The app uses Puppeteer to open a headless browser, navigate to [UnicodePedia](https://www.unicodepedia.com/), and scrape Unicode values for a given list of symbols.

1. The list of symbols is stored in `./list`.
2. Each symbol is submitted to the search form on the site.
3. The script then scrapes the resulting table and extracts the Unicode representation (UTF-16 Javascript format) of the symbol.

## Usage

1. Add the symbols you want to scrape in the `list.js` file as an array of strings:

   ```js
   const characters = ["€", "£", "$", "©"];
   export default characters;
   ```

2. Run the app to scrape Unicode symbols:

   ```bash
   npm start
   ```

   This command will:

   - Scrape the Unicode values for the symbols in the list.
   - Save the results in a `unicode.json` file.

## Output

The results are saved in a file called `unicode.json` in the following format:

```json
[
  {
    "unicode": "\\u20AC",
    "currentUrl": "https://www.unicodepedia.com/unicode-url-here"
  },
  {
    "unicode": "\\u00A3",
    "currentUrl": "https://www.unicodepedia.com/unicode-url-here"
  }
]
```

## Development

The app is written in JavaScript and uses TypeScript for type checking during development. You can run the TypeScript compiler in watch mode using the following command:

```bash
npm run build
```

The application will automatically compile and watch for any changes in your TypeScript files.

## License

This project is licensed under the ISC License.

---

Let me know if you need any changes to the README!