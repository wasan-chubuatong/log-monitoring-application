const fs = require("fs");
const path = require("path");
const { processLogs } = require("./service/logs-service");

const inputFile = path.join("input", "logs.log");
const fullInputPath = path.join(process.cwd(), inputFile);

if (!fs.existsSync(fullInputPath)) {
    console.error(`File not found: ${fullInputPath}`);
}

const reportDir = processLogs(inputFile);

if (reportDir) {
  console.log(`Logs written to: ${reportDir}`);
} else {
  console.log("No log files created (No warnings or errors)");
}