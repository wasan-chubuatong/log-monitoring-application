function parseTime(timeStr) {
  const parts = timeStr.split(":");
  if (parts.length !== 3) {
    throw new Error(`Invalid time format (HH:MM:SS): ${timeStr}`);
  }

  const [hour, minute, second] = timeStr.split(":").map(Number);
  if (Number.isNaN(hour) || (hour < 0 || hour > 23)) {
    throw new Error(`Invalid time format (Hour): ${timeStr}`);
  }

  if (Number.isNaN(minute) || (minute < 0 || minute > 59)) {
    throw new Error(`Invalid time format (Minute): ${timeStr}`);
  }

  if (Number.isNaN(second) || (second < 0 || second > 59)) {
    throw new Error(`Invalid time format (Second): ${timeStr}`);
  }

  return hour * 3600 + minute * 60 + second;
}

function formatDuration(seconds) {
  if (seconds < 0) {
    throw new Error(`Invalid duration (Minus): ${seconds}`);
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const minPart = `${mins} minute${mins > 1 ? "s" : ""}`;
  const secPart = `${secs} second${secs > 1 ? "s" : ""}`;
  return `${minPart} ${secPart}`;
}

module.exports = {
  parseTime,
  formatDuration
}