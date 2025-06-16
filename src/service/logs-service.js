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
    if (status === "WARNING") warnMessages.push(createMessage({ pid, description, duration}));
    else if (status === "ERROR") errorMessages.push(createMessage({ pid, description, duration}));
  });
  const reportDir = path.join(process.cwd(), outputFolder, fileName);

  return createReportFile(warnMessages, errorMessages, reportDir);
}

function createMessage({ pid, description, duration }) {
  const timeStr = formatDuration(duration);
  return `PID ${pid} (${description}) took ${timeStr}.\n`;
}

function createReportFile(warnMessages, errorMessages, reportDir) {
  if (warnMessages.length || errorMessages.length) {
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