import styled from "styled-components";
import { animated } from "react-spring";
import { Size, Align, ButtonTypes } from "../interfaces_types/types";

export const WalletWrapper = styled(animated.div)`
    display: flex;
    bacground-color: #ffffff;
    padding: 20px 30px
    box-shadow: rgba(0,0,0,.1) 0 0 21px 0;
    max-width: 350px;
    min-width: 300px;
    border-radius: 15px;
    flex-direction: column;
    margin: 10px;
    //margin-left: auto;
    flex: 1;
    opacity: 0;
    will-change: transform, opacity;
`;

export const WalletTitle = styled.h2`
  margin: 0px 10px;
  font-size: 30px;
  font-weight: normal;
  color: #495f79;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

type WalletBalanceProps = {
  size?: Size;
};

export const WalletBalance = styled.div`
  font-size: ${(props: WalletBalanceProps) =>
    props.size === Size.Small ? "12px" : "20px"};
  color: #929aa5;
  text-align: left;
  margin-top: 10px;
`;
export const WalletInput = styled.input`
  font-size: 60px;
  border: none;
  color: #597597;
  outline: none;
  max-width: calc(100% - 80px);
  text-align: right;
  margin: 20px 0px;
  "::-webkit-input-placeholder": {
    color: #eee;
  }
`;

export const InputFill = styled.div`
  font-size: 60px;
  color: #597597;
  text-align: right;
  margin: 20px 0px;
  margin-left: 10px;
`;

type CurrencyLogoProps = {
  currency?: string;
  size: Size;
};

type ExchangeTextProps = {
  size: Size;
  align: Align;
};

export const ExhangeRate = styled.div`
  color: #7f7d92;
  text-align: ${(props: ExchangeTextProps) =>
    props.align === Align.Left ? "left" : "right"};
  font-size: ${(props: ExchangeTextProps) =>
    props.size === Size.Large ? "18px" : "12px"};
  margin-left: auto;
`;

export const CurrencyLogo = styled.div`
    color: #FFFFFF;
    border-radius: 50%;
    width: ${({ size }: CurrencyLogoProps) => {
      switch (size) {
        case Size.Large:
          return "60px";
        case Size.Medium:
          return "40px";
        case Size.Small:
          return "25px";
        default:
          return "60px";
      }
    }} 
    height: ${({ size }: CurrencyLogoProps) => {
      switch (size) {
        case Size.Large:
          return "60px";
        case Size.Medium:
          return "40px";
        case Size.Small:
          return "25px";
        default:
          return "60px";
      }
    }} 
    align-items: center;
    justify-content: center;
    display: flex;
    font-size: ${({ size }: CurrencyLogoProps) => {
      switch (size) {
        case Size.Large:
          return "30px";
        case Size.Medium:
          return "20px";
        case Size.Small:
          return "12px";
        default:
          return "30px";
      }
    }} 
    box-shadow: rgba(0,0,0,0.1) 0 0 15px 0;
    background-image: ${(props: CurrencyLogoProps) => {
      switch (props.currency) {
        case "USD":
          return "linear-gradient(260deg, rgba(151,155,150,0.99) 0%, #9995CD 100%);";
        case "EUR":
          return "linear-gradient(260deg, rgba(82,97,75,0.99) 0%, #C79D72 100%);";
        case "GBP":
          return "linear-gradient(260deg, rgba(160,206,141,0.99) 0%, #5679C6 100%);";
        case "DKK":
          return "linear-gradient(260deg, rgba(158,117,117,0.99) 0%, #81C656 100%);";
        case "CZK":
          return "linear-gradient(260deg, rgba(112,88,125,0.99) 0%, #57664D 100%);";
        case "MYR":
          return "linear-gradient(260deg, rgba(125,88,88,0.99) 0%, #8EAF79 100%);";
        case "SEK":
          return "linear-gradient(260deg, rgba(111,131,205,0.99) 0%, #151E10 100%);";
        default:
          return "linear-gradient(260deg, rgba(151,155,150,0.99) 0%, #9995CD 100%);";
      }
    }}

`;

type ButtonProps = {
  type?: ButtonTypes;
  active: Boolean;
};

export const Button = styled.div`
    background-image: linear-gradient(260deg, #4FCBC6 0%, #6BEAAB 100%);
    box-shadow: 0 2px 20px 0 rgba(85,209,193,0.64);
    border-radius: 5px;
    padding: 10px 20px;
    color: #fff;
    cursor: ${({ active }: ButtonProps) => {
      return !active ? "not-allowed;" : "pointer;";
    }}
    &:hover{
        background-image: ${({ active }: ButtonProps) => {
          return !active
            ? "linear-gradient(260deg, #efefef 0%, #efefef 100%);"
            : "linear-gradient(260deg, #fdd59a 0%, #f8a163 100%);";
        }}
        box-shadow: ${({ active }: ButtonProps) => {
          return !active ? "none;" : "0 2px 20px 0 rgba(85,209,193,0.8);";
        }}
    }
    background-image: ${({ active }: ButtonProps) => {
      return !active
        ? "linear-gradient(260deg, #efefef 0%, #efefef 100%);"
        : "linear-gradient(260deg, #4FCBC6 0%, #6BEAAB 100%);";
    }}
    box-shadow: ${({ active }: ButtonProps) => {
      return !active ? "none;" : "0 2px 20px 0 rgba(85,209,193,0.64);";
    }}
`;

export const CircleButton = styled.div`
  border-radius: 50%;
  cursor: pointer;
  background-color: yellow;
  width: 25px;
  height: 25px;
  margin: 10px;
`;

export const WalletRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const WalletColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const DoubleLogo = styled.div`
  width: 80px;
  height: 40px;
  position: relative;
`;
export const TransactionDetail = styled.div`
  font-size: 14px;
  color: #495f79;
  text-align: left;
  margin-top: 10px;
  min-width: 80px;
  text-align: right;
`;
