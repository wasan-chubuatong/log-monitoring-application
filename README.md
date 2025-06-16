# Log Monitoring Application

This Node.js application analyzes log files to identify long running scheduled tasks and generates warning & error reports based on task durations.

---

## Installation

1. **Install Node.js**  
   Download and install from [https://nodejs.org](https://nodejs.org)

2. **Install project dependencies**  
   ```bash
   npm install
   ```

---
## Usage

### Prerequisite


- Make sure your log file is inside the `input/` folder.
- Each log line should be in the following format:

```
HH:MM:SS,<task description>, START|END,<PID>
```

Example:
```
11:00:00,scheduled task 001, START,10001
11:06:00,scheduled task 001, END,10001
```

- Time format is validated. Invalid entries like 25:00:00 or 11:60:00 will throw an error.


### Run Application
#### Run with default input
```bash
npm run log
```
- Reads from `input/logs.log` by default

#### Run with a specific input file
```bash
npm run log <filename>
```
Example:
```bash
npm run log ok.log
```

- Generated reports saved in the `report/<filename>/` directory:

  `warn.log`: tasks taking **more than 5 minutes**

  `error.log`: tasks taking **more than 10 minutes**
- Output durations are human readable (e.g., `7 minutes 13 seconds`).
- If no warnings or errors are found, no report files are created.

---

## Run Tests

### Execute unit tests
```bash
npm run test
```

### View test coverage
```bash
npm run test:coverage
```
