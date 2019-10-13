import React, {SFC} from 'react'
import {connect} from 'react-redux'
import { StoreState, WalletSides, Size } from '../interfaces_types/types'
import IWallet from '../interfaces_types/Wallet'
import {CircleButton, CurrencyLogo, WalletColumn} from '../theme/'
import {setFromWallet, setToWallet, setLeftWallet, setRightWallet, resetWallets} from '../services/actions/wallets'

type OwnProps = {
    wallets: IWallet[];
    toWallet: IWallet;
    fromWallet: IWallet;
    leftWallet: IWallet;
    rightWallet: IWallet;
    side: WalletSides;
}

type StateProps = {
    
}

type DispatchProps = {
    setFromWallet: (wallet: IWallet) => void;
    setToWallet: (wallet: IWallet) => void;
    setLeftWallet: (wallet: IWallet) => void;
    setRightWallet: (wallet: IWallet) => void;
    resetWallets: (fromWallet:IWallet, toWallet: IWallet) => void;
}

const mapStateToProps = (state: StoreState):StateProps => ({
    
});

const dispatchProps = {
    setFromWallet, 
    setToWallet, 
    setLeftWallet, 
    setRightWallet,
    resetWallets
};

type IProps = StateProps & OwnProps & DispatchProps;

const WalletChanger:SFC<IProps> = ({
    wallets, 
    side, 
    fromWallet,
    toWallet,
    leftWallet,
    rightWallet,
    setFromWallet, 
    setToWallet, 
    setLeftWallet, 
    resetWallets,
    setRightWallet}) => {

    const leftWalletClick = (w:IWallet) => {
        setLeftWallet && setLeftWallet(w);
        if(fromWallet.currency === leftWallet.currency){
            resetWallets && resetWallets(w, toWallet)
        }else{
            resetWallets && resetWallets(toWallet, w)
        }
    }

    const rightWalletClick = (w:IWallet) => {
        setRightWallet && setRightWallet(w);
        if(fromWallet.currency === rightWallet.currency){
            resetWallets && resetWallets(w, toWallet)
        }else{
            resetWallets && resetWallets(toWallet, w)
        }
    }
    return (
        <WalletColumn style={{width: '45px', margin: '0px'}}>
            {(wallets||[]).map((w, i) => (
                <CircleButton key={`wc-${i}-${side}`} onClick={() => {
                    if(side === WalletSides.Left){
                        leftWalletClick(w)
                    }else{
                        rightWalletClick(w)
                    }
                }}>
                    <CurrencyLogo data-testid={`walletchanger-logo-${i}-${side}`} size={Size.Small} currency={w.currency}>{w.symbol}</CurrencyLogo>
                </CircleButton>
            ))}
        </WalletColumn>
    );
}

export default connect(mapStateToProps, dispatchProps)(WalletChanger)