const { STATUS, THRESHOLD } = require("../constant");
const { parseTime } = require("./time");

function parseLogs(logLines) {
  const jobs = {};
  for (const line of logLines) {
    const [time, description, status, pid] = line.split(",").map(s => s.trim());
    const seconds = parseTime(time);
    if (!jobs[pid]) {
      jobs[pid] = { description, start: null, end: null };
    }

    if (status === STATUS.START) {
      jobs[pid].start = seconds;
    } else if (status === STATUS.END) {
      jobs[pid].end = seconds;
    }
  }
  return jobs;
}

function evaluateJobs(jobs) {
  const results = [];
  for (const [pid, job] of Object.entries(jobs)) {
    const { start, end, description } = job;

    // Incomplete job
    if (start == null || end == null) {
      results.push({
        pid,
        description,
        status: STATUS.INCOMPLETE,
        duration: null
      });
      continue;
    }

    // Overnight job
    let duration = end - start;
    if (duration < 0) duration += 86400;

    let status = STATUS.OK;
    if (duration > THRESHOLD.ERROR) status = STATUS.ERROR;
    else if (duration > THRESHOLD.WARNING) status = STATUS.WARNING;

    results.push({
      pid,
      description,
      status,
      duration
    });
  }
  return results;
}

module.exports = {
  parseLogs,
  evaluateJobs
}