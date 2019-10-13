import Rates from "./Rates";
import Wallet from "./Wallet";
import Transaction from "./Transaction";

export type NullableRates = Rates | null;
export type NullableString = string | null;
export type NullableNumber = number | null;
export type NullableRate = Rate | null;
export type NullableWallets = Wallet[] | null;
export type NullableWallet = Wallet | null;
export type NullableBalance = Balance | null;

export type PairWallets = {
  fromWallet: Wallet;
  toWallet: Wallet;
};

export type Balance = {
  currency: string;
  balance: number;
  diff: number;
  label: string;
};

export type BalancePair = {
  [s: string]: Balance;
};

export type StoreState = {
  Rates: NullableRates;
  fromRate: Rate | null;
  toRate: Rate | null;
  error: NullableString;
  Wallets: WalletsState;
};

export type RatesState = {
  rates: NullableRates;
  fromRate: Rate | null;
  toRate: Rate | null;
  error: NullableString;
  base: NullableString;
};

export type WalletsState = {
  wallets: NullableWallets;
  fromWallet: NullableWallet;
  toWallet: NullableWallet;
  balances: BalancePair | null;
  leftWallet: NullableWallet;
  rightWallet: NullableWallet;
  transactions: Transaction[];
  value: string;
};

export type Action = {
  type: string;
  payload: any;
};

export type ConverterArgs = {
  fromType: string;
  toType: string;
  value: number;
  rates: Rates;
  base?: string;
  decimalPlaces?: number;
  fallback?: number;
};

export type Rate = {
  currency: string;
  rate: number;
};

export enum Size {
  Large = "Large",
  Medium = "Medium",
  Small = "Small"
}

export enum Align {
  Left,
  Right
}

export enum ButtonTypes {
  Main,
  Secondary,
  Disabled
}

export enum Theme {
  Dark,
  Light
}

export enum WalletType {
  From = "fromWallet",
  To = "toWallet"
}

export enum WalletSides {
  Left = "leftWallet",
  Right = "rightWallet"
}

// Props

export type InputProps = {
  wallet: Wallet;
  exchangeWallet: Wallet;
  theme: Theme;
  triggerConversion?: (
    input: string,
    fromWallet: Wallet,
    toWallet: Wallet
  ) => void;
  setFromWallet?: (w: Wallet) => void;
  setToWallet?: (w: Wallet) => void;
};

export type WalletProps = {
  wallet: Wallet;
  exchangeWallet: Wallet;
  theme: Theme;
  type: WalletType;
  balances: BalancePair;
  toWallet: Wallet;
  exchange: () => void;
};
