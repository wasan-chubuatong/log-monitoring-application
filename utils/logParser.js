const { STATUS } = require("../constant");

function parseLogs(logLines) {
  const jobs = {};
  for (const line of logLines) {
    const [time, description, status, pid] = line.split(",").map(s => s.trim());
    const [hour, minute, second] = time.split(":").map(Number);
    const seconds = hour * 3600 + minute * 60 + second;
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