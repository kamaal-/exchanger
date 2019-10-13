import React, {SFC} from 'react'
import ITransaction from '../interfaces_types/Transaction'
import {StoreState} from '../interfaces_types/types'
import Transaction from './Transaction'
import {WalletRow} from '../theme'
import {connect} from 'react-redux'

type OwnProps = {
    
};

type StateProps = {
    transactions: ITransaction[];
}

type DispatchProps = {
    
}

const mapStateToProps = (state: StoreState):StateProps => ({
    transactions: state.Wallets.transactions
});

const dispatchProps = {
};

type IProps = StateProps & OwnProps & DispatchProps;

const TransactionsList:SFC<IProps> = ({transactions}) => {
    return (
        <WalletRow style={{flexWrap: 'wrap', paddingLeft: '45px'}}>
            {(transactions||[]).map((t, i) => <Transaction key={`tra-${i}`} transaction={t}/>)}
        </WalletRow>
    );
}

export default connect(mapStateToProps, dispatchProps)(TransactionsList)
