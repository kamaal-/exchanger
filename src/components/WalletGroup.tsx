import React, { SFC } from "react";
import Wallet from "./Wallet";
import {
  StoreState,
  BalancePair,
  WalletSides,
  WalletType,
  NullableWallet,
  NullableWallets,
  Theme
} from "../interfaces_types/types";
import { exchange } from "../services/actions/wallets";
import { connect } from "react-redux";
import WalletChanger from "./WalletChanger";
import IWallet from "../interfaces_types/Wallet";

type OwnProps = {
  side: WalletSides;
};

type DispatchProps = {
  exchange: () => void;
};

type StateProps = {
  fromWallet: NullableWallet;
  leftWallet: NullableWallet;
  rightWallet: NullableWallet;
  toWallet: NullableWallet;
  balances: BalancePair | null;
  wallets: NullableWallets;
};

const mapStateToProps = (state: StoreState): StateProps => ({
  fromWallet: state.Wallets.fromWallet,
  leftWallet: state.Wallets.leftWallet,
  rightWallet: state.Wallets.rightWallet,
  toWallet: state.Wallets.toWallet,
  balances: state.Wallets.balances,
  wallets: state.Wallets.wallets
});

const dispatchProps: DispatchProps = {
  exchange
};

type IProps = StateProps & OwnProps & DispatchProps;

const WalletGroup: SFC<IProps> = ({
  fromWallet,
  toWallet,
  leftWallet,
  rightWallet,
  side,
  balances,
  wallets,
  exchange
}) => {
  const wallet =
    side === WalletSides.Left && leftWallet && rightWallet
      ? leftWallet
      : rightWallet;
  const exchangeWallet =
    wallet && fromWallet && toWallet
      ? wallet.currency !== fromWallet.currency
        ? fromWallet
        : toWallet
      : null;
  const _type =
    wallet && fromWallet && toWallet
      ? wallet.currency === fromWallet.currency
        ? WalletType.From
        : WalletType.To
      : WalletType.From;
  const displayableWallets = (wallets || []).filter(
    (w: IWallet) =>
      fromWallet &&
      toWallet &&
      (w.currency !== fromWallet.currency && w.currency !== toWallet.currency)
  );
  return wallet &&
    exchangeWallet &&
    balances &&
    leftWallet &&
    rightWallet &&
    toWallet ? (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {side === WalletSides.Left ? (
        <WalletChanger
          side={side}
          fromWallet={wallet}
          toWallet={exchangeWallet}
          leftWallet={leftWallet}
          rightWallet={rightWallet}
          wallets={displayableWallets}
        />
      ) : null}
      <Wallet
        toWallet={toWallet}
        exchange={exchange}
        balances={balances}
        type={_type}
        exchangeWallet={exchangeWallet}
        theme={Theme.Light}
        wallet={wallet}
      />
      {side === WalletSides.Right ? (
        <WalletChanger
          side={side}
          fromWallet={wallet}
          toWallet={exchangeWallet}
          leftWallet={leftWallet}
          rightWallet={rightWallet}
          wallets={displayableWallets}
        />
      ) : null}
    </div>
  ) : null;
};

export default connect(
  mapStateToProps,
  dispatchProps
)(WalletGroup);
