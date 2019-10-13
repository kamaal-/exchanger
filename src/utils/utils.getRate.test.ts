import { getRate } from "./index";
import { rates } from "../__mocks__/rates";

describe("Get rates", () => {
  it("should return null for empty rates", () => {
    expect(getRate("USD", {})).toBe(null);
  });

  it("should return null for null rates", () => {
    expect(getRate("USD", null)).toBe(null);
  });

  it("should return null for array rates", () => {
    expect(getRate("USD", [{}])).toBe(null);
  });

  it("should return null for wrong rates", () => {
    expect(getRate("USR", { USD: 1.2 })).toBe(null);
  });

  it("should return 1 for wrong rates", () => {
    expect(getRate("USD", rates)).toEqual({ currency: "USD", rate: 1 });
  });
});
