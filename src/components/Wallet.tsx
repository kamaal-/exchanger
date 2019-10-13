import React, { useState } from "react";
import { useSpring } from "react-spring";
import {
  WalletWrapper,
  WalletTitle,
  CurrencyLogo,
  ExhangeRate,
  WalletBalance,
  Button,
  WalletRow
} from "../theme/index";
import { Size, Align, WalletProps } from "../interfaces_types/types";
import { formateDecimalPlaces } from "../utils";
import Input from "./Input";
import Balance from "./Balance";

const Wallet = ({
  wallet,
  exchangeWallet,
  theme,
  type,
  exchange,
  toWallet
}: WalletProps) => {
  const styleProps = useSpring({
    from: { opacity: "0" },
    to: { opacity: "1" }
  });
  const exchangeRate = wallet.convert
    ? wallet.convert(1, exchangeWallet)
    : null;
  const [buttonIsActive, setButtonState] = useState<Boolean>(false);
  const isToWallet = wallet.currency === toWallet.currency;
  return (
    <WalletWrapper style={styleProps}>
      <WalletRow>
        <CurrencyLogo data-testid={`wallet-logo`} size={Size.Large} currency={wallet.currency}>
          {wallet.symbol}
        </CurrencyLogo>
        <WalletTitle data-testid={`wallet-currency`}>{wallet.currency}</WalletTitle>
        <ExhangeRate data-testid={`wallet-exchange`} size={Size.Large} align={Align.Right}>
          {exchangeRate
            ? `1 ${wallet.currency} = ${exchangeRate} ${exchangeWallet.currency}`
            : ""}
        </ExhangeRate>
      </WalletRow>
      <WalletRow>
        <WalletBalance data-testid={`wallet-balance`}>
          You have {formateDecimalPlaces(wallet.balance)} {wallet.currency}
        </WalletBalance>
      </WalletRow>
      <Input
        setButtonState={setButtonState}
        exchangeWallet={exchangeWallet}
        wallet={wallet}
        theme={theme}
      />
      <WalletRow style={{ alignItems: "flex-end" }}>
        <Balance type={type} />
        <Button data-testid={`wallet-button`}
          onClick={() => {
            if (buttonIsActive) {
              // do the math
              exchange();
            }
          }}
          active={buttonIsActive && !isToWallet}
          style={{ width: "100px", marginLeft: "auto" }}
        >
          EXCHANGE
        </Button>
      </WalletRow>
    </WalletWrapper>
  );
};

export default Wallet;
