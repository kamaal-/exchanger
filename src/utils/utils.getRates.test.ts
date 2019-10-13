import { getRates } from "./index";
import { rates } from "../__mocks__/rates";

describe("Get rates", () => {
  it("should return null for wrong rates", () => {
    expect(getRates("USD", "USD", rates, "USD")).toBe(1);
  });

  it("should return null for wrong rates", () => {
    expect(getRates("SEK", "USD", rates, "USD")).toBe(9.9072136814);
  });

  it("should return null for wrong rates", () => {
    expect(getRates("SEK", "EUR", rates, "USD")).toBe(0.0918189330677133);
  });
});
