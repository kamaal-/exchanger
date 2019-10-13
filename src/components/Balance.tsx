import React, {Fragment} from 'react'
import {WalletBalance} from '../theme/index'
import {Size, WalletType, StoreState, BalancePair, Balance as IBalance} from '../interfaces_types/types'
import {formateDecimalPlaces} from '../utils'
import {connect} from 'react-redux'

type Props = {
    type?: WalletType; 
    balances?: BalancePair
}

const BalanceComponent = (props:Props) => {
    const {balances, type} = props
    const balence:IBalance | null = type && balances ? balances[type] :  null;
    return (
        <Fragment>
            {balence ? <WalletBalance data-testid={`${type}-balance`} size={Size.Small}>You will have {formateDecimalPlaces(balence.balance)} {balence.currency}</WalletBalance>: '' }
        </Fragment>
    )
}

export default connect((state: StoreState) => { 
    return {
        balances: state.Wallets.balances
    }
}, {})(BalanceComponent)
