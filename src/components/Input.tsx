import React, {SFC} from 'react'
import {WalletRow, WalletInput,InputFill} from '../theme/index'
import { BalancePair, StoreState, Theme } from '../interfaces_types/types'
import {validateNumberWithTwoDecimalPoints, formateDecimalPlaces} from '../utils/'
import IWallet from '../interfaces_types/Wallet'
import {connect} from 'react-redux'
import {setFromWallet, triggerConversion, resetWallets, setValue}  from '../services/actions/wallets'

type OwnProps = {
    exchangeWallet: IWallet;
    wallet: IWallet;
    theme: Theme;
    setButtonState: (state:Boolean) => void;
};

type StateProps = {
    toWallet: IWallet | null;
    balances: BalancePair | null;
    value: string;
}

type DispatchProps = {
    setFromWallet: (setFromWallet:IWallet) => void;
    resetWallets: (fromWallet:IWallet, toWallet: IWallet) => void;
    triggerConversion: (input:string, fromWallet:IWallet, toWallet: IWallet) => void;
    setValue: (value: string) => void;
}

const mapStateToProps = (state: StoreState):StateProps => ({
    toWallet: state.Wallets.toWallet,
    balances: state.Wallets.balances,
    value: state.Wallets.value
});

const dispatchProps = {
    setFromWallet,
    resetWallets,
    triggerConversion,
    setValue
};

type IProps = StateProps & OwnProps & DispatchProps;

const Input:SFC<IProps> = (props) => {
    const {wallet, exchangeWallet, resetWallets, triggerConversion, toWallet, balances, setButtonState, setValue, value} = props;
    const startConversion = triggerConversion ? triggerConversion: () => {};
    const placeholder: number = (toWallet && balances && toWallet.currency === wallet.currency) ?  balances['toWallet'] ? formateDecimalPlaces(balances['toWallet'].diff) :0 : 0
    
    return (
        <WalletRow data-testid={`${wallet.currency}-input`}>
            <WalletInput
                data-testid={`revolut-input`}
                onFocus={() => {
                    setValue('');
                    resetWallets && resetWallets(wallet, exchangeWallet);
                }}
                placeholder={`${placeholder}`} 
                value={(toWallet && (wallet.currency !== toWallet.currency)) ? value : ''} 
                onChange={(e) => {
                    let {value} = e.target
                    value = value.replace('-', '')
                    let validInput = validateNumberWithTwoDecimalPoints(value);
                    if(validInput){
                        setValue(`-${value}`);
                        if(wallet && exchangeWallet){
                            startConversion(value.replace('-', ''), wallet, exchangeWallet);
                        }
                        setButtonState(true)
                    }else{
                        setButtonState(false)
                    }
                    if(!value || value === ''){
                        setValue('');
                        setButtonState(false)
                        if(wallet && exchangeWallet){
                            startConversion('0', wallet, exchangeWallet);
                        }
                    }
                }
            }/>
            <InputFill>
                {wallet.symbol}
            </InputFill>
        </WalletRow>
           
    )
}

export default connect(mapStateToProps, dispatchProps)(Input)
