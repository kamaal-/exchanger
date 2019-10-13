import {
  formateDecimalPlaces,
  insertValue,
  simplifyTransaction,
  checkAmountIsExeedingBalance,
  validateNumberWithTwoDecimalPoints,
  validateNumbersAndTwoDecimallPoints
} from "./index";
import { wallets } from "../__mocks__/wallets";
import { rates } from "../__mocks__/rates";

describe("Format to float", () => {
  it("should return 12.56", () => {
    expect(formateDecimalPlaces(12.567)).toBe(12.56);
  });

  it("should return 12.55", () => {
    expect(formateDecimalPlaces(12.553)).toBe(12.55);
  });

  it("should return 1", () => {
    expect(formateDecimalPlaces(100)).toBe(100.0);
  });
});

describe("Format to float", () => {
  it("should return 12.56", () => {
    expect(formateDecimalPlaces(12.567)).toBe(12.56);
  });

  it("should return 12.55", () => {
    expect(formateDecimalPlaces(12.553)).toBe(12.55);
  });

  it("should return 1", () => {
    expect(formateDecimalPlaces(100)).toBe(100.0);
  });
});

describe("Perfom transaction", () => {
  it("Convert from USD to GBR 12$", () => {
    expect(insertValue(rates, "USD", 12, wallets[1], wallets[2])).toEqual({
      fromWallet: {
        currency: "USD",
        rate: 1,
        balance: 138.45,
        symbol: "$"
      },
      toWallet: {
        currency: "GBP",
        rate: 0.8110161012,
        balance: 330.13,
        symbol: "l"
      }
    });
  });

  it("Convert from USD to USD 2$", () => {
    expect(insertValue(rates, "USD", 2, wallets[0], wallets[0])).toEqual({
      fromWallet: {
        currency: "EUR",
        rate: 0.9096697899,
        balance: 8.23,
        symbol: "€"
      },
      toWallet: {
        currency: "EUR",
        rate: 0.9096697899,
        balance: 12.23,
        symbol: "€"
      }
    });
  });

  it("Convert from USD to EUR 5.45$", () => {
    expect(insertValue(rates, "USD", 5.45, wallets[1], wallets[0])).toEqual({
      fromWallet: {
        currency: "USD",
        rate: 1.0,
        balance: 145,
        symbol: "$"
      },
      toWallet: {
        currency: "EUR",
        rate: 0.9096697899,
        balance: 15.18,
        symbol: "€"
      }
    });
  });

  it("Conversion simplified", () => {
    expect(
      simplifyTransaction(
        insertValue(rates, "USD", 5.45, wallets[1], wallets[0]),
        5.45
      )
    ).toEqual("Exchanged 5.45 USD to EUR");
  });
});

describe("Validate input and", () => {
  it("should valid input for 12.56", () => {
    expect(validateNumberWithTwoDecimalPoints("12.56")).toBe("12.56");
  });

  it("should valid input for 1", () => {
    expect(validateNumberWithTwoDecimalPoints("1")).toBe("1");
  });

  it("should valid input with space fro 12.57", () => {
    expect(validateNumberWithTwoDecimalPoints(" 12.57 ")).toBe("12.57");
  });

  it("should invalid input for empty", () => {
    expect(validateNumberWithTwoDecimalPoints("")).toBe(null);
  });

  it("should invalid input for space", () => {
    expect(validateNumberWithTwoDecimalPoints(" ")).toBe(null);
  });

  it("should invalid input for 12.678", () => {
    expect(validateNumberWithTwoDecimalPoints("12.578")).toBe(null);
  });

  it("should invalid input for 1a.8", () => {
    expect(validateNumberWithTwoDecimalPoints("1a.8")).toBe(null);
  });
});

describe("Validate amount", () => {
  it("should return amount", () => {
    expect(checkAmountIsExeedingBalance(12.4, 90.4)).toBe(12.4);
  });

  it("should return amount", () => {
    expect(checkAmountIsExeedingBalance(12.4, 12.4)).toBe(12.4);
  });

  it("should return null", () => {
    expect(checkAmountIsExeedingBalance(12.4, 12.3)).toBe(null);
  });

  it("should return 3700.45", () => {
    expect(checkAmountIsExeedingBalance("3700.45", 4000.56)).toBe(3700.45);
  });

  it("should return null", () => {
    expect(checkAmountIsExeedingBalance("1001.56", 1000.36)).toBe(null);
  });
});
