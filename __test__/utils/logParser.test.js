const { parseLogs, evaluateJobs } = require("../../utils/logParser");
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

describe("evaluateJobs", () => {
  test("Single job", () => {
    const resultOne = evaluateJobs(jobs_data.jobs_one);
    expect(resultOne[0].status).toBe("WARNING");
    expect(resultOne[0].duration).toBe(301);
  });

  test("Multiple job", () => {
    const resultTwo = evaluateJobs(jobs_data.jobs_two);
    expect(resultTwo[0].status).toBe("WARNING");
    expect(resultTwo[0].duration).toBe(301);
    expect(resultTwo[1].status).toBe("ERROR");
    expect(resultTwo[1].duration).toBe(630);
    expect(resultTwo[2].status).toBe("OK");
    expect(resultTwo[2].duration).toBe(299);
  });

  test("Incomplete job", () => {
    const resultThree = evaluateJobs(jobs_data.jobs_three);
    expect(resultThree[0].status).toBe("INCOMPLETE");
    expect(resultThree[0].duration).toBe(null);
  });

  test("Overnight job", () => {
    const resultFour = evaluateJobs(jobs_data.jobs_four);
    expect(resultFour[0].status).toBe("OK");
    expect(resultFour[0].duration).toBe(70);
  });
});