export const APP = {
  LOAD_WALLETS_STARTED: "revolut/app/LOAD_WALLETS_STARTED",
  LOAD_WALLETS_DONE: "revolut/app/LOAD_WALLETS_DONE",
  LOAD_WALLETS_FAILED: "revolut/app/LOAD_WALLETS_FAILED",

  LOAD_HISTORY_STARTED: "revolut/app/LOAD_HISTORY_STARTED",
  LOAD_HISTORY_DONE: "revolut/app/LOAD_HISTORY_DONE",
  LOAD_HISTORY_FAILED: "revolut/app/LOAD_HISTORY_FAILED",

  START_POLLING: "revolut/app/START_POLLING",
  SUCCESS_POLLING: "revolut/app/SUCCESS_POLLING"
};

export const GET_RATES = {
  STARTED: "revolut/api/GET_RATES_STARTED",
  SUCCESS: "revolut/api/GET_RATES_SUCCESS",
  ERROR: "revolut/api/GET_RATES_ERROR"
};

export const RATE = {
  SET_FROM: "revolut/ui/RATE_SET_FROM",
  SET_TO: "revolut/ui/RATE_SET_TO",
  SWITCH: "revolut/ui/RATE_SWITCH",
  RESET: "revolut/ui/RATE_RESET"
};

export const WALLETS = {
  ADD: "revolut/ui/WALLETS_ADD",
  SWITCH: "revolut/ui/WALLETS_SWITCH",
  REMOVE: "revolut/ui/WALLETS_REMOVE",
  FROM: "revolut/ui/WALLETS_FROM",
  TO: "revolut/ui/WALLETS_TO",
  LEFT: "revolut/ui/WALLETS_LEFT",
  RIGHT: "revolut/ui/WALLETS_RIGHT",
  RESET: "revolut/ui/WALLETS_RESET",
  ADD_TRANSACTION: "revolut/ui/WALLETS_ADD_TRANSACTION",
  SET_VALUE: "revolut/ui/SET_VALUE"
};

export const CONVERT = {
  DO: "revolut/ui/CONVERT_DO",
  RUN: "revolut/ui/CONVERT_RUN",
  START_SAVE: "revolut/ui/CONVERT_START_SAVE",
  DONE_SAVING: "revolut/ui/CONVERT_DONE_SAVING",
  FAIL_SAVING: "revolut/ui/CONVERT_FAIL_SAVING"
};
