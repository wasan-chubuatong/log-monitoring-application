const path = require("path");
const { processLogs } = require("./src/service/logs-service");

const fileName = process.argv[2] || "logs.log";
const inputFile = path.join("input", fileName);
const reportDir = processLogs(inputFile);

if (reportDir) {
  console.log(`Logs written to: ${reportDir}`);
} else {
  console.log("No log files created (No warnings or errors)");
}