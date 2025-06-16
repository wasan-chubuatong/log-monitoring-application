const { STATUS } = require("../constant");
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

module.exports = {
  parseLogs
}