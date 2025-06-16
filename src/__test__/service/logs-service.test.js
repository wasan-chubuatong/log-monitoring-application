const fs = require("fs");
const path = require("path");
const { processLogs } = require("../../service/logs-service");

const testInputDir = path.join(__dirname, "temp_input");
const testReportDir = path.join(__dirname, "temp_report");
const testInputDirStr = path.join("src", "__test__", "service", "temp_input");
const testReportDirStr = path.join("src", "__test__", "service", "temp_report");

beforeAll(() => {
  fs.mkdirSync(testInputDir, { recursive: true });
});

afterAll(() => {
  fs.rmSync(testInputDir, { recursive: true, force: true });
  fs.rmSync(testReportDir, { recursive: true, force: true });
});

test("should create warn.log and error.log when thresholds are exceeded", () => {
  const logData = [
    "11:00:00,task A, START,10001",
    "11:06:00,task A, END,10001", // 6 minutes -> WARNING
    "11:00:00,task B, START,10002",
    "11:11:00,task B, END,10002", // 11 minutes -> ERROR
  ].join("\n");

  const fileTestName = "test.log";
  const inputFilePath = path.join(testInputDir, fileTestName);
  fs.writeFileSync(inputFilePath, logData, "utf-8");

  const reportPath = processLogs(
    path.join(testInputDirStr, fileTestName),
    path.join(testReportDirStr, fileTestName));
  const warnPath = path.join(reportPath, "warn.log");
  const errorPath = path.join(reportPath, "error.log");

  expect(fs.existsSync(warnPath)).toBe(true);
  expect(fs.existsSync(errorPath)).toBe(true);

  const warnContent = fs.readFileSync(warnPath, "utf-8");
  const errorContent = fs.readFileSync(errorPath, "utf-8");

  expect(warnContent).toMatch(/task A/);
  expect(errorContent).toMatch(/task B/);
});


test("should create only warn.log", () => {
  const logData = [
    "11:00:00,task A, START,10001",
    "11:06:00,task A, END,10001", // 6 minutes -> WARNING
  ].join("\n");

  const fileTestName = "test_warn.log";
  const inputFilePath = path.join(testInputDir, fileTestName);
  fs.writeFileSync(inputFilePath, logData, "utf-8");

  const reportPath = processLogs(
    path.join(testInputDirStr, fileTestName),
    path.join(testReportDirStr, fileTestName));
  const warnPath = path.join(reportPath, "warn.log");
  const errorPath = path.join(reportPath, "error.log");

  expect(fs.existsSync(warnPath)).toBe(true);
  expect(fs.existsSync(errorPath)).toBe(false);
});

test("should create only error.log", () => {
  const logData = [
    "11:00:00,task B, START,10002",
    "11:11:00,task B, END,10002", // 11 minutes -> ERROR
  ].join("\n");

  const fileTestName = "test_error.log";
  const inputFilePath = path.join(testInputDir, "test_error.log");
  fs.writeFileSync(inputFilePath, logData, "utf-8");

  const reportPath = processLogs(
    path.join(testInputDirStr, fileTestName),
    path.join(testReportDirStr, fileTestName));
  const warnPath = path.join(reportPath, "warn.log");
  const errorPath = path.join(reportPath, "error.log");

  expect(fs.existsSync(warnPath)).toBe(false);
  expect(fs.existsSync(errorPath)).toBe(true);
});

test("should not create report folder if have only 1 line", () => {
  const logData = [
    "11:00:00,task A, START,10001"
  ].join("\n");

  const fileTestName = "test_single.log";
  const inputFilePath = path.join(testInputDir, "test_single.log");
  fs.writeFileSync(inputFilePath, logData, "utf-8");

  const reportPath = processLogs(
    path.join(testInputDirStr, fileTestName),
    path.join(testReportDirStr, fileTestName));
  expect(reportPath).toBeNull();
});

test("should not create report folder if no warnings or errors", () => {
  const logData = [
    "11:00:00,task OK, START,20001",
    "11:01:00,task OK, END,20001" // 1 minute -> NORMAL
  ].join("\n");

  const fileTestName = "test_ok.log";
  const inputFilePath = path.join(testInputDir, "test_ok.log");
  fs.writeFileSync(inputFilePath, logData, "utf-8");

  const reportPath = processLogs(
    path.join(testInputDirStr, fileTestName),
    path.join(testReportDirStr, fileTestName));
  expect(reportPath).toBeNull();
});

test("input file not exist", () => {
  expect(() => processLogs("test_no_file.log")).toThrow();
});