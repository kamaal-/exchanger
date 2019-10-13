import React from "react";
import { useSpring } from "react-spring";
import {
  WalletWrapper,
  CurrencyLogo,
  DoubleLogo,
  WalletBalance,
  WalletRow,
  TransactionDetail
} from "../theme/index";
import { Size } from "../interfaces_types/types";
import ITransaction from "../interfaces_types/Transaction";
import moment from "moment";

type Props = {
  transaction: ITransaction;
};

const Transaction = ({ transaction }: Props) => {
  const styleProps = useSpring({
    from: { opacity: "0" },
    to: { opacity: "1" }
  });
  return (
    <WalletWrapper style={styleProps}>
      <WalletRow style={{ alignItems: "flex-start" }}>
        <DoubleLogo>
          <CurrencyLogo 
            data-testid={`transation-currency`}
            style={{ position: "absolute", left: "0", top: "0" }}
            currency={transaction.wallets.from.currency}
            size={Size.Medium}
          >
            {transaction.wallets.from.symbol}
          </CurrencyLogo>
          <CurrencyLogo
            data-testid={`transation-currency-2`}
            style={{ position: "absolute", left: "25px", top: "0" }}
            currency={transaction.wallets.to.currency}
            size={Size.Medium}
          >
            {transaction.wallets.to.symbol}
          </CurrencyLogo>
        </DoubleLogo>
        <TransactionDetail
          data-testid={`transation-details`}
          style={{
            marginTop: "0px",
            marginLeft: "10px",
            textAlign: "left",
            marginRight: "20px"
          }}
        >
          {transaction.detail}
        </TransactionDetail>
        <WalletBalance
          data-testid={`transation-balance`}
          style={{
            marginLeft: "auto",
            marginTop: "0px",
            textAlign: "right",
            minWidth: "80px"
          }}
          size={Size.Small}
        >
          {transaction.exchange}
        </WalletBalance>
      </WalletRow>
      <WalletRow style={{ marginTop: "10px" }}>
        <WalletBalance size={Size.Small} data-testid={`transation-history-from`}>
          {transaction.from.before} &#8594; {transaction.from.diff} &#8594;{" "}
          {transaction.from.after}
        </WalletBalance>
      </WalletRow>
      <WalletRow>
        <WalletBalance size={Size.Small} data-testid={`transation-history-to`}>
          {transaction.to.before} &#8594; {transaction.to.diff} &#8594;{" "}
          {transaction.to.after}
        </WalletBalance>
        <WalletBalance style={{ marginLeft: "auto" }} size={Size.Small} data-testid={`transation-date`}>
          {moment(transaction.time).format("DD/MM/YYYY HH:mm")}
        </WalletBalance>
      </WalletRow>
    </WalletWrapper>
  );
};

export default Transaction;
