import { WalletsState, Action } from "../../interfaces_types/types";
import { WALLETS, CONVERT, APP } from "../action_types/index";

export const initialState: WalletsState = {
  wallets: null,
  fromWallet: null,
  toWallet: null,
  balances: null,
  leftWallet: null,
  rightWallet: null,
  transactions: [],
  value: ""
};

export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case WALLETS.ADD:
      return { ...state, wallets: payload };
    case WALLETS.REMOVE:
      return { ...state, wallets: payload };
    case WALLETS.FROM:
      return { ...state, fromWallet: payload };
    case WALLETS.TO:
      return { ...state, toWallet: payload };
    case WALLETS.SWITCH:
      return {
        ...state,
        toWallet: state.fromWallet,
        fromWallet: state.toWallet
      };
    case CONVERT.DO:
      return { ...state };
    case WALLETS.LEFT:
      return { ...state, leftWallet: payload };
    case WALLETS.RIGHT:
      return { ...state, rightWallet: payload };
    case WALLETS.RESET:
      return {
        ...state,
        balances: payload.balances,
        fromWallet: payload.fromWallet,
        toWallet: payload.toWallet
      };
    case CONVERT.RUN:
      return { ...state, balances: payload };
    case WALLETS.ADD_TRANSACTION:
      return { ...state, transactions: payload };
    case WALLETS.SET_VALUE:
      return { ...state, value: payload };
    case APP.SUCCESS_POLLING:
    case APP.START_POLLING:
      return { ...state };
    default:
      return initialState;
  }
};
