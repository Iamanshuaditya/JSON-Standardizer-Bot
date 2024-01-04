const fs = require("fs");
const csv = require("csv-parser");

function standardizeData(data, fileFormat) {
  const standardizedData = [];

  for (const entry of data) {
    const standardizedEntry = {};
    for (const [key, value] of Object.entries(entry)) {
      const standardizedKey = applyPattern(key);
      standardizedEntry[standardizedKey] = value;
    }
    standardizedData.push(standardizedEntry);
  }

  return standardizedData;
}

function applyPattern(key) {
  const lowerKey = key.toLowerCase();

  const patterns = [
    { aliases: ["isbn"], standardized: "ISBN" },
    { aliases: ["book-title", "title"], standardized: "Title" },
    { aliases: ["book-author", "authors"], standardized: "Authors" },
    { aliases: ["image-url-l", "thumbnailurl"], standardized: "Image-URL-L" },
  ];

  for (const pattern of patterns) {
    if (pattern.aliases.includes(lowerKey)) {
      return pattern.standardized;
    }
  }

  return lowerKey;
}

function readData(filePath, fileFormat) {
  if (fileFormat === "json") {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  } else if (fileFormat === "csv") {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => console.log("CSV file successfully processed"));
    return rows;
  } else {
    throw new Error("Unsupported file format");
  }
}

function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const inputFilePath = "input_data.csv"; // Change to the actual CSV file path
const outputFilePath = "output_data.json";

// Determine the file format based on the file extension or other criteria
const fileFormat = inputFilePath.endsWith(".json")
  ? "json"
  : inputFilePath.endsWith(".csv")
  ? "csv"
  : null;

if (fileFormat) {
  // Read data from file
  const inputData = readData(inputFilePath, fileFormat);

  // Process and standardize the data
  const standardizedData = standardizeData(inputData, fileFormat);

  // Write the standardized data back to a new JSON file
  writeJsonFile(outputFilePath, standardizedData);
} else {
  console.error("Unsupported file format");
}
