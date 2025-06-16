const fs = require("fs");
const path = require("path");
const { parseLogs, evaluateJobs } = require("../utils/logParser");
const { formatDuration } = require("../utils/time");

function processLogs(inputPath, outputFolder = "report") {
  const fileName = path.basename(inputPath);
  const fullInputPath = path.join(process.cwd(), inputPath);

  if (!fs.existsSync(fullInputPath)) {
    throw new Error(`File not found: ${fullInputPath}`);
  }

  const logLines = fs.readFileSync(fullInputPath, "utf-8").trim().split("\n");
  const jobs = parseLogs(logLines);
  const results = evaluateJobs(jobs);

  const warnMessages = [];
  const errorMessages = [];

  results.forEach(({ pid, description, status, duration }) => {
    if (!duration) return;
    const timeStr = formatDuration(duration);
    const message = `PID ${pid} (${description}) took ${timeStr}.\n`;
    if (status === "WARNING") warnMessages.push(message);
    else if (status === "ERROR") errorMessages.push(message);
  });

  if (warnMessages.length || errorMessages.length) {
    const reportDir = path.join(process.cwd(), outputFolder, fileName);
    fs.mkdirSync(reportDir, { recursive: true });

    if (warnMessages.length) {
      fs.writeFileSync(path.join(reportDir, "warn.log"), warnMessages.join(""));
    }

    if (errorMessages.length) {
      fs.writeFileSync(path.join(reportDir, "error.log"), errorMessages.join(""));
    }

    return reportDir;
  }

  return null;
}

module.exports = { processLogs }