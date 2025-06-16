const { parseLogs } = require("../../utils/logParser");
const { logLines_data, jobs_data } = require("../mock");

describe("parseLogs", () => {
  test("parseLogs correctly", () => {
    expect(parseLogs(logLines_data.logLines_one)).toEqual(jobs_data.jobs_one);
    expect(parseLogs(logLines_data.logLines_two)).toEqual(jobs_data.jobs_two);
  });

  test("parseLogs wrong status", () => {
    expect(parseLogs(logLines_data.logLines_three)).toEqual({
        "0": {
            "description": "wrong data",
            "end": null,
            "start": null
        }
    });
  });
});