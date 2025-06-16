const { parseTime, formatDuration } = require('../../utils/time')

describe("parseTime", () => {
  test("should convert HH:MM:SS to seconds", () => {
    expect(parseTime("00:00:01")).toBe(1);
    expect(parseTime("00:01:01")).toBe(61);
    expect(parseTime("01:01:01")).toBe(3661);
    expect(parseTime("02:30:59")).toBe(9059);
  });

  test("should correctly parse single digit in time string", () => {
    expect(parseTime("00:00:1")).toBe(1);
    expect(parseTime("00:1:00")).toBe(60);
    expect(parseTime("1:00:00")).toBe(3600);
    expect(parseTime("1:1:1")).toBe(3661);
  });

  test("throws specific error for invalid seconds", () => {
    expect(() => parseTime("01:01:99")).toThrow("Invalid time format (Second)");
  });

  test("throws specific error for invalid minutes", () => {
    expect(() => parseTime("01:99:01")).toThrow("Invalid time format (Minute)");
  });

  test("throws specific error for invalid hour", () => {
    expect(() => parseTime("99:01:01")).toThrow("Invalid time format (Hour)");
  });

  test("throws specific error for syntax issue", () => {
    expect(() => parseTime("01:01")).toThrow("Invalid time format (HH:MM:SS)");
  });
});


describe("formatDuration", () => {
  test("should format duration correctly", () => {
    expect(formatDuration(0)).toBe("0 minute 0 second");
    expect(formatDuration(1)).toBe("0 minute 1 second");
    expect(formatDuration(61)).toBe("1 minute 1 second");
    expect(formatDuration(122)).toBe("2 minutes 2 seconds");
    expect(formatDuration(359)).toBe("5 minutes 59 seconds");
    expect(formatDuration(659)).toBe("10 minutes 59 seconds");
    expect(formatDuration(3600)).toBe("60 minutes 0 second");
    expect(formatDuration(86400)).toBe("1440 minutes 0 second");
  });

  test("throws specific error for negetive number", () => {
    expect(() => formatDuration(-1)).toThrow("Invalid duration (Minus): -1");
  });

});