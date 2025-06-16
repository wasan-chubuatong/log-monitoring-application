const fs = require("fs");
const path = require("path");

const inputFile = path.join("input", "logs.log");
const fullInputPath = path.join(process.cwd(), inputFile);

if (!fs.existsSync(fullInputPath)) {
    console.error(`File not found: ${fullInputPath}`);
}

const logLines = fs.readFileSync(fullInputPath, "utf-8").trim().split("\n");
console.log(logLines);