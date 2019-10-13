import walletReducer, { initialState } from "./wallets";
import { WALLETS } from "../action_types/index";
import { wallets } from "../../__mocks__/wallets";

describe("Wallets reducers", () => {
  let state = initialState;
  it("should update wallets", () => {
    const previousState = state;
    const expected = { ...previousState, wallets: wallets };
    expect(
      walletReducer(state, { type: WALLETS.ADD, payload: wallets })
    ).toEqual(expected);
  });

  it("should set from wallets", () => {
    const previousState = state;
    const expected = { ...previousState, fromWallet: wallets[1] };
    expect(
      walletReducer(state, { type: WALLETS.FROM, payload: wallets[1] })
    ).toEqual(expected);
  });

  it("should set to wallets", () => {
    const previousState = state;
    const expected = { ...previousState, toWallet: wallets[0] };
    expect(
      walletReducer(state, { type: WALLETS.TO, payload: wallets[0] })
    ).toEqual(expected);
  });

  it("should switch from & to", () => {
    const previousState = state;
    const expected = {
      ...previousState,
      toWallet: previousState.fromWallet,
      fromWallet: previousState.toWallet
    };
    expect(
      walletReducer(state, { type: WALLETS.SWITCH, payload: wallets[0] })
    ).toEqual(expected);
  });
});
