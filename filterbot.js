const fs = require("fs");
const axios = require("axios");

async function filterValidImages(jsonData) {
  const validImages = [];
  const concurrencyLimit = 10; // Adjust the concurrency limit as needed
  const delayBetweenRequests = 1000; // Adjust the delay in milliseconds

  // Create an array of promises for concurrent processing
  const promises = [];

  for (let i = 0; i < jsonData.length; i += concurrencyLimit) {
    const batch = jsonData.slice(i, i + concurrencyLimit);
    promises.push(processBatch(batch, delayBetweenRequests));
  }

  // Wait for all batches to complete
  const results = await Promise.all(promises);

  // Concatenate results from all batches
  results.forEach((result) => {
    validImages.push(...result);
  });

  return validImages;
}

async function processBatch(batch, delay) {
  const batchResults = [];

  for (const entry of batch) {
    const imageUrl = entry["Image-URL-L"];

    try {
      const isValid = await isImageValid(imageUrl);
      if (isValid) {
        batchResults.push(entry);
      }
      // Introduce a delay between requests
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      console.error(`Error checking image at ${imageUrl}: ${error.message}`);
    }
  }

  return batchResults;
}

async function isImageValid(imageUrl) {
  try {
    // Extract the URL from the format 'link to image'
    const urlMatch = imageUrl.match(/'([^']+)'/);
    const actualUrl = urlMatch ? urlMatch[1] : imageUrl;

    console.log("Checking image URL:", actualUrl);

    const response = await axios.head(actualUrl);

    // Check if response is not blank and status is 200 or 403
    const isValid = response.status === 200 || response.status === 403;

    console.log(`Image check complete. Valid: ${isValid}`);

    return isValid;
  } catch (error) {
    console.error(`Error checking image at ${imageUrl}: ${error.message}`);
    throw error;
  }
}

function readJsonFile(filePath) {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const inputFilePath = "output_data.json";
const outputFilePath = "new.json";

// Read JSON data from file
const inputData = readJsonFile(inputFilePath);

// Filter out items with valid image URLs
filterValidImages(inputData)
  .then((validData) => {
    // Write the filtered data back to a new JSON file
    writeJsonFile(outputFilePath, validData);
    console.log("Filtering completed. Valid data saved to", outputFilePath);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
