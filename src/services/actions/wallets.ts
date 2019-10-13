import { WALLETS, CONVERT } from "../action_types/";
import { ThunkDispatch } from "redux-thunk";
import { saveInLocalStorage } from "../../utils/";
import Wallet from "../../interfaces_types/Wallet";
import { StoreState, Balance, BalancePair } from "../../interfaces_types/types";
import Transaction from "../models/Transaction";
import ITransaction from "../../interfaces_types/Transaction";

export const setFromWallet = (wallet: Wallet) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: () => StoreState
) => {
  let { balances } = getState().Wallets;
  balances = balances ? { ...balances } : {};
  await saveInLocalStorage("fromWallet", wallet);
  dispatch({ type: WALLETS.FROM, payload: wallet });
  balances["fromWallet"] = {
    currency: wallet.currency,
    balance: wallet.balance,
    diff: 0,
    label: "Balance"
  };
  dispatch({ type: CONVERT.RUN, payload: balances });
};

export const setLeftWallet = (wallet: Wallet) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: () => StoreState
) => {
  await saveInLocalStorage("leftWallet", wallet);
  dispatch({ type: WALLETS.LEFT, payload: wallet });
};

export const setToWallet = (wallet: Wallet) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: () => StoreState
) => {
  let { balances } = getState().Wallets;
  balances = balances ? { ...balances } : {};
  await saveInLocalStorage("toWallet", wallet);
  dispatch({ type: WALLETS.TO, payload: wallet });
  balances["toWallet"] = {
    currency: wallet.currency,
    balance: wallet.balance,
    diff: 0,
    label: "After"
  };
  dispatch({ type: CONVERT.RUN, payload: balances });
};

export const setRightWallet = (wallet: Wallet) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: () => StoreState
) => {
  await saveInLocalStorage("rightWallet", wallet);
  dispatch({ type: WALLETS.RIGHT, payload: wallet });
};

export const switcWallets = () => (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: () => StoreState
) => {
  let { fromWallet, toWallet } = getState().Wallets;
  if (fromWallet && toWallet) {
    dispatch(setToWallet(fromWallet));
    dispatch(setFromWallet(toWallet));
    dispatch(triggerConversion("0", toWallet, fromWallet));
  }
};

export const resetWallets = (fromWallet: Wallet, toWallet: Wallet) => (
  dispatch: ThunkDispatch<{}, {}, any>
) => {
  if (fromWallet && toWallet) {
    const balances = {
      fromWallet: {
        currency: fromWallet.currency,
        balance: fromWallet.balance,
        diff: 0,
        label: "Balance"
      },
      toWallet: {
        currency: toWallet.currency,
        balance: toWallet.balance,
        diff: 0,
        label: "Balance"
      }
    };

    dispatch({
      type: WALLETS.RESET,
      payload: { balances, fromWallet, toWallet }
    });
    dispatch(setValue(""));
  }
};

export const saveTransaction = (
  transaction: ITransaction,
  key = "transactions"
) => (dispatch: ThunkDispatch<{}, {}, any>) => {
  if (transaction && transaction instanceof Transaction) {
    let transactionsList: ITransaction[] = [];
    try {
      const oldTransactions = localStorage.getItem(key);
      if (oldTransactions) {
        transactionsList = JSON.parse(oldTransactions);
      }
      transactionsList = transactionsList.map(t => {
        const obj = new Transaction();
        obj.convenientConsttructor(t);
        return obj;
      });
      transactionsList.unshift(transaction);
      saveInLocalStorage(key, transactionsList);
      dispatch({ type: WALLETS.ADD_TRANSACTION, payload: transactionsList });
    } catch (error) {
      transactionsList.unshift(transaction);
      saveInLocalStorage(key, transactionsList);
      dispatch({ type: WALLETS.ADD_TRANSACTION, payload: transactionsList });
    }
  }
};

export const triggerConversion = (
  input: string,
  fromWallet: Wallet,
  toWallet: Wallet
) => (dispatch: ThunkDispatch<{}, {}, any>) => {
  if (input && fromWallet && toWallet) {
    dispatch({ type: CONVERT.DO, payload: { input, fromWallet, toWallet } });
  }
};

export const getTransaction = (
  fromWallet: Wallet,
  toWallet: Wallet,
  balances: BalancePair
) => new Transaction(fromWallet, toWallet, balances);

export const exchange = (cb = () => {}) => (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: () => StoreState
) => {
  const state: StoreState = getState();
  const { fromWallet, toWallet, balances, wallets } = state.Wallets;

  // detuct from wallet
  if (fromWallet && toWallet && balances) {
    const fromBalance: Balance = balances["fromWallet"];
    const toBalance = balances["toWallet"];
    // only pass the exchange if their any values and value can deduct from purse.
    if (
      fromBalance.diff &&
      toBalance.diff &&
      Math.abs(fromBalance.diff) <= fromWallet.balance
    ) {
      // keep the transaction before update wallets
      const transaction = getTransaction(fromWallet, toWallet, balances);

      fromWallet.balance = fromBalance.balance;
      toWallet.balance = toBalance.balance;
      const newWallets = (wallets || [])
        .map(w => (w.currency === fromWallet.currency ? fromWallet : w))
        .map(w => (w.currency === toWallet.currency ? toWallet : w));
      dispatch(updateWallets(newWallets));
      dispatch(setFromWallet(fromWallet));
      dispatch(setToWallet(toWallet));
      const newBalances = {
        fromWallet: {
          currency: fromWallet.currency,
          balance: fromWallet.balance,
          diff: 0,
          label: "Balance"
        },
        toWallet: {
          currency: toWallet.currency,
          balance: toWallet.balance,
          diff: 0,
          label: "Balance"
        }
      };
      dispatch({
        type: WALLETS.RESET,
        payload: { balances: newBalances, fromWallet, toWallet }
      });
      dispatch(saveTransaction(transaction));
      dispatch(resetWallets(fromWallet, toWallet));
      dispatch(setValue(""));
    }
  }
};

export const updateWallets = (wallets: Wallet[]) => async (
  dispatch: ThunkDispatch<{}, {}, any>
) => {
  if (wallets && wallets.length >= 0) {
    await saveInLocalStorage("wallets", wallets);
    dispatch({ type: WALLETS.ADD, payload: wallets });
  }
};

export const setValue = (value: string) => async (
  dispatch: ThunkDispatch<{}, {}, any>
) => {
  dispatch({ type: WALLETS.SET_VALUE, payload: value });
};
