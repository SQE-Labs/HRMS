const fs = require("fs");
const path = require("path");

const allureResultsDir = path.join(__dirname, "allure-results");
const outputFile = path.join(allureResultsDir, "merged-results.json");

function mergeAllureResults() {
  if (!fs.existsSync(allureResultsDir)) {
    console.error("❌ Allure results folder not found!");
    return;
  }

  const files = fs.readdirSync(allureResultsDir).filter(f => f.endsWith(".json"));
  let merged = [];

  files.forEach(file => {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(allureResultsDir, file), "utf8"));
      if (Array.isArray(content)) {
        merged = merged.concat(content);
      } else {
        merged.push(content);
      }
    } catch (err) {
      console.error(`⚠️ Skipping invalid file: ${file}`);
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(merged, null, 2));
  console.log(`✅ Merged ${files.length} Allure JSON files into: ${outputFile}`);
}

mergeAllureResults();
