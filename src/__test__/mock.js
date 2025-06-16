const logLines_data = {
    "logLines_one": [
      "11:00:00,scheduled task 001, START,10001",
      "11:05:01,scheduled task 001, END,10001"
    ],
    "logLines_two": [
      "11:00:00,scheduled task 001, START,10001",
      "11:05:01,scheduled task 001, END,10001",
      "11:00:00,background job dej, START,10002",
      "11:10:30,background job dej, END,10002",
      "11:00:00,scheduled task 003, START,10003",
      "11:04:59,scheduled task 003, END,10003"
    ],
    "logLines_three": [
      "11:00:00,wrong data, NO,0"
    ],
}

const jobs_data = {
    "jobs_one": {
        "10001": {
            "description": "scheduled task 001",
            "end": 39901,
            "start": 39600
        }
    },
    "jobs_two": {
        "10001": {
          "description": "scheduled task 001",
          "end": 39901,
          "start": 39600
        },
        "10002": {
          "description": "background job dej",
          "end": 40230,
          "start": 39600,
       },
       "10003": {
          "description": "scheduled task 003",
          "end": 39899,
          "start": 39600,
       }
    },
    "jobs_three": {
        "10001": {
            "description": "scheduled task 001",
            "end": null,
            "start": 39600
        }
    },
    "jobs_four": {
        "10001": {
            "description": "scheduled task 001",
            "end": 60,
            "start": 86390
        }
    },
}

module.exports = {
  logLines_data,
  jobs_data
}