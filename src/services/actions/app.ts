import { APP, WALLETS, GET_RATES } from "../action_types/";
import { ThunkDispatch } from "redux-thunk";
import { createWalletsWithRates } from "../../utils/";
import Rates from "../../interfaces_types/Rates";
import Wallet from "../../interfaces_types/Wallet";
import ITransactions from "../../interfaces_types/Transaction";
import Transaction from "../models/Transaction";
import Rate from "../models/Rate";
import axios from "axios";
import {
  setFromWallet,
  setToWallet,
  setRightWallet,
  setLeftWallet,
  updateWallets
} from "./wallets";

export const getRatesFromServer = (): Promise<any> => {
  return axios.get(
    "https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,EUR,SEK,CZK,MYR"
  );
};
/*
 *
 */
export const init = () => (dispatch: ThunkDispatch<{}, {}, any>) => {
  let rates: Rates = {};
  getRatesFromServer()
    .then(({ data }) => {
      Object.keys(data.rates).forEach((key: string) => {
        rates[key] = new Rate({ currency: key, rate: data.rates[key] });
      });
      const base = data.base ? data.base : null;
      dispatch({ type: GET_RATES.SUCCESS, payload: { rates, base } });
      dispatch(loadWallets({ rates, base }));
      dispatch(loadTransactions());
      dispatch({ type: APP.START_POLLING });
    })
    .catch(e => {
      dispatch({ type: GET_RATES.ERROR, payload: e.error });
    });
};

export const loadTransactions = () => (
  dispatch: ThunkDispatch<{}, {}, any>
) => {
  let transactions: ITransactions[] = [];
  try {
    const transactionsString = localStorage.getItem("transactions");
    transactions = transactionsString ? JSON.parse(transactionsString) : [];
    transactions = transactions.map(t => {
      const obj = new Transaction();
      obj.convenientConsttructor(t);
      return obj;
    });
    dispatch({ type: WALLETS.ADD_TRANSACTION, payload: transactions });
  } catch (error) {
    dispatch({ type: WALLETS.ADD_TRANSACTION, payload: transactions });
  }
};

export const loadWallets = ({ rates }: any) => (
  dispatch: ThunkDispatch<{}, {}, any>
) => {
  dispatch({ type: APP.LOAD_WALLETS_STARTED });
  try {
    const storedWallets = localStorage.getItem("wallets");
    const wallets = storedWallets ? JSON.parse(storedWallets) : null;
    let updatedWallets: Wallet[] | null = null;
    if (wallets && wallets.length) {
      const currencyBalanceTupples = wallets.map((w: Wallet, i: number) => [
        w.currency,
        w.balance,
        w.id ? w.id : i
      ]);
      updatedWallets = createWalletsWithRates(currencyBalanceTupples, rates);
    } else {
      updatedWallets = createWalletsWithRates(
        [
          ["USD", 100, 0],
          ["GBP", 100, 1],
          ["EUR", 100, 2],
          ["SEK", 100, 3],
          ["CZK", 200, 4],
          ["MYR", 200, 5]
        ],
        rates
      );
    }

    if (updatedWallets) {
      dispatch(updateWallets(updatedWallets));
      dispatch(loadWallet(updatedWallets, "fromWallet"));
      dispatch(loadWallet(updatedWallets, "toWallet"));
    }
  } catch (error) {
    console.log(error);
  }
};

export const loadWallet = (wallets: Wallet[], key: string) => (
  dispatch: ThunkDispatch<{}, {}, any>
) => {
  let updatedWallet: Wallet | null = null;
  try {
    const storedWallet = localStorage.getItem(key);
    const wallet: Wallet = storedWallet ? JSON.parse(storedWallet) : null;
    if (wallet) {
      updatedWallet =
        (wallets || []).find((w: Wallet) => w.currency === wallet.currency) ||
        null;
    } else {
      if (key === "fromWallet") updatedWallet = wallets[0];
      if (key === "toWallet") updatedWallet = wallets[2];
    }

    requestAnimationFrame(() => {
      if (key === "fromWallet" && updatedWallet)
        dispatch(setFromWallet(updatedWallet));
      if (key === "fromWallet" && updatedWallet)
        dispatch(setLeftWallet(updatedWallet));
      if (key === "toWallet" && updatedWallet)
        dispatch(setToWallet(updatedWallet));
      if (key === "toWallet" && updatedWallet)
        dispatch(setRightWallet(updatedWallet));
    });
  } catch (error) {
    console.log(error);
  }
};
