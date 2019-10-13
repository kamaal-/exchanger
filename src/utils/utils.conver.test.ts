import { convert } from "./index";
import { rates } from "../__mocks__/rates";
describe("convert", () => {
  it("should return 0.89", () => {
    expect(convert({ fromType: "EUR", toType: "GBP", value: 1, rates })).toBe(
      0.89
    );
  });

  it("should return 10.699", () => {
    expect(
      convert({
        fromType: "EUR",
        toType: "GBP",
        value: 12,
        rates,
        decimalPlaces: 3
      })
    ).toBe(10.698);
  });

  it("should return 9.73", () => {
    expect(convert({ fromType: "USD", toType: "GBP", value: 12, rates })).toBe(
      9.73
    );
  });

  it("should return 24.33", () => {
    expect(convert({ fromType: "USD", toType: "GBP", value: 30, rates })).toBe(
      24.33
    );
  });

  it("should return 30", () => {
    expect(convert({ fromType: "UD", toType: "GBP", value: 30, rates })).toBe(
      30
    );
  });

  it("should return 0", () => {
    expect(
      convert({ fromType: "USD", toType: "GBP", value: "30", rates })
    ).toBe(0);
  });

  it("should return 0", () => {
    expect(convert()).toBe(0);
  });

  it("should return 0 for empty object", () => {
    expect(convert({})).toBe(0);
  });
});
