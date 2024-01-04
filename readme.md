 
```markdown
# JSON Data Standardization Bot

## Overview

This script is a simple tool for standardizing JSON data based on predefined patterns. It reads data from a file, processes it by standardizing keys, and writes the standardized data back to a new JSON file.

## Prerequisites

- Node.js installed on your machine. You can download it from [Node.js website](https://nodejs.org/).

## Installation

1. Clone or download the repository to your local machine.

   ```bash
   git clone https://github.com/Iamanshuaditya/JSON-Standardizer-Bot
   ```

2. Navigate to the project directory.

   ```bash
   cd json-standardization-bot
   ```

3. Install the required dependencies.

   ```bash
   npm install
   ```

## Usage

1. Place your input JSON file in the project directory (e.g., `input_data.json`).

2. Open a terminal and run the script.

   ```bash
   node cli_bot.js
   ```

3. The standardized data will be saved in a new JSON file named `output_data.json`.

## Customizing Patterns

If you want to customize the patterns for key standardization, open the `cli_bot.js` file and update the `applyPattern` function with your desired patterns.

## Supported File Formats

- The script currently supports JSON files. If you want to extend support for other formats, modify the script accordingly.

## Example

```bash
node cli_bot.js
```

This command reads `input_data.json`, standardizes the keys, and writes the result to `output_data.json`.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
```

 