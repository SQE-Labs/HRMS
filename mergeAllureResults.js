const fs = require("fs");
const path = require("path");

const resultsDir = path.join(__dirname, "allure-results");
const outputFile = path.join(resultsDir, "summary.json");

let total = {
  passed: 0,
  failed: 0,
  broken: 0,
  skipped: 0,
  unknown: 0,
  total: 0,
};

// Store latest result per test (key = test name)
const latestResults = new Map();

try {
  const files = fs.readdirSync(resultsDir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(resultsDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Only count test-case type JSON files
    if (content.name && content.status) {
      const testName = content.name.trim();

      // If the same test already exists, prefer the latest one by `start` timestamp
      const existing = latestResults.get(testName);
      if (!existing || (content.start && existing.start && content.start > existing.start)) {
        latestResults.set(testName, content);
      } else if (!existing) {
        latestResults.set(testName, content);
      }
    }
  }

  // Aggregate results
  for (const [, test] of latestResults) {
    total.total++;

    switch (test.status.toLowerCase()) {
      case "passed":
        total.passed++;
        break;
      case "failed":
        total.failed++;
        break;
      case "broken":
        total.broken++;
        break;
      case "skipped":
        total.skipped++;
        break;
      default:
        total.unknown++;
    }
  }

  // Calculate pass percentage
  total.passPercentage = ((total.passed / total.total) * 100).toFixed(2) + "%";

  fs.writeFileSync(outputFile, JSON.stringify(total, null, 2));
  console.log("✅ Allure summary generated successfully:");
  console.table(total);
} catch (err) {
  console.error("❌ Error generating summary:", err.message);
}
