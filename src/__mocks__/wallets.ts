import IWallet from "../interfaces_types/Wallet";
import { rates } from "./rates";
import Wallet from "../services/models/Wallet";
import { symbol } from "prop-types";

export const wallets: IWallet[] = [
  {
    currency: rates["EUR"].currency,
    rate: rates["EUR"].rate,
    balance: 10.23,
    symbol: "€"
  },
  {
    currency: rates["USD"].currency,
    rate: rates["USD"].rate,
    balance: 150.45,
    symbol: "$"
  },
  {
    currency: rates["GBP"].currency,
    rate: rates["GBP"].rate,
    balance: 320.4,
    symbol: "l"
  }
];

export const balances = {
  fromWallet: {
    currency: "EUR",
    balance: 10.23,
    diff: 0,
    label: "Balance"
  },
  toWallet: {
    currency: "USD",
    balance: 150.45,
    diff: 0,
    label: "Balance"
  }
};

export const balances_ok = {
  fromWallet: {
    currency: "EUR",
    balance: 10.23,
    diff: -3.23,
    label: "Balance"
  },
  toWallet: {
    currency: "USD",
    balance: 150.45,
    diff: 4.56,
    label: "Balance"
  }
};

export const balances_not_ok = {
  fromWallet: {
    currency: "EUR",
    balance: 10.23,
    diff: -10.24,
    label: "Balance"
  },
  toWallet: {
    currency: "USD",
    balance: 150.45,
    diff: 4.56,
    label: "Balance"
  }
};


export const transactions = [ 
  { 
     "detail":"You have transfered 34 kr to RM.",
     "wallets":{ 
        "from":{ 
           "currency":"SEK",
           "symbol":"kr"
        },
        "to":{ 
           "currency":"MYR",
           "symbol":"RM"
        }
     },
     "from":{ 
        "before":"100 kr",
        "diff":"34 kr",
        "after":"66 kr"
     },
     "to":{ 
        "before":"200 RM",
        "diff":"14.47 RM",
        "after":"214.47 RM"
     },
     "exchange":"1 kr = 0.42 RM",
     "time":1570979215945
  },
  { 
     "detail":"You have transfered 2 € to £.",
     "wallets":{ 
        "from":{ 
           "currency":"EUR",
           "symbol":"€"
        },
        "to":{ 
           "currency":"GBP",
           "symbol":"£"
        }
     },
     "from":{ 
        "before":"95 €",
        "diff":"2 €",
        "after":"93 €"
     },
     "to":{ 
        "before":"104.38 £",
        "diff":"1.75 £",
        "after":"106.13 £"
     },
     "exchange":"1 € = 0.87 £",
     "time":1570979187093
  },
  { 
     "detail":"You have transfered 5 € to £.",
     "wallets":{ 
        "from":{ 
           "currency":"EUR",
           "symbol":"€"
        },
        "to":{ 
           "currency":"GBP",
           "symbol":"£"
        }
     },
     "from":{ 
        "before":"100 €",
        "diff":"5 €",
        "after":"95 €"
     },
     "to":{ 
        "before":"100 £",
        "diff":"4.38 £",
        "after":"104.38 £"
     },
     "exchange":"1 € = 0.87 £",
     "time":1570973116868
  }
];