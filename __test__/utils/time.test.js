const { parseTime } = require('../../utils/time')

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