import ITransaction from '../../interfaces_types/Transaction'
import IWallet from '../../interfaces_types/Wallet'
import {BalancePair, Balance} from '../../interfaces_types/types'
import moment from 'moment'
import {formateDecimalPlaces} from '../../utils' 

export default class Transaction implements ITransaction {
    detail = '';
    wallets = {
        from: {
            currency: '',
            symbol: ''
        },
        to: {
            currency: '',
            symbol: ''
        },
    };
    from = {
        before: '',
        diff: '',
        after: ''
    };
    to = {
        before: '',
        diff: '',
        after: ''
    }
    exchange = '';
    time = moment().valueOf()

    constructor(fromWallet?:IWallet, toWallet?:IWallet, balances?: BalancePair){
        if(fromWallet && toWallet && balances){
            const fromBalance:Balance = balances['fromWallet'];
            const toBalance:Balance = balances['toWallet'];
            debugger
            this.wallets.from = {currency: fromWallet.currency, symbol: fromWallet.symbol};
            this.wallets.to = {currency: toWallet.currency, symbol: toWallet.symbol};

            this.from.before = `${formateDecimalPlaces(fromWallet.balance)} ${fromWallet.symbol}`;
            this.from.diff = `${formateDecimalPlaces(fromBalance.diff)} ${fromWallet.symbol}`;
            this.from.after = `${formateDecimalPlaces(fromBalance.balance)} ${fromWallet.symbol}`;

            this.to.before = `${formateDecimalPlaces(toWallet.balance)} ${toWallet.symbol}`;
            this.to.diff = `${formateDecimalPlaces(toBalance.diff)} ${toWallet.symbol}`;
            this.to.after = `${formateDecimalPlaces(toBalance.balance)} ${toWallet.symbol}`;
            this.exchange = fromWallet.convert ?  `1 ${fromWallet.symbol} = ${fromWallet.convert(1, toWallet)} ${toWallet.symbol}` : '';
            this.detail = `You have transfered ${formateDecimalPlaces(fromBalance.diff)} ${fromWallet.symbol} to ${toWallet.symbol}.`;
        }
    }

    convenientConsttructor = (data:ITransaction) => {
        this.detail = data.detail;
        this.from = data.from;
        this.exchange = data.exchange;
        this.to = data.to;
        this.wallets = data.wallets;
        this.time = data.time;
    }
}