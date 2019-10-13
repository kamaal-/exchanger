import IWallet from '../../interfaces_types/Wallet'
import {_convert, formateDecimalPlaces} from '../../utils'


export default class Wallet implements IWallet {

    currency: string = '';
    balance:number = 0;
    rate:number = 1;
    id?:number;
    symbol: string = '';
    constructor(args?:IWallet, id?:number){
        const {rate = 1, currency = '', balance = 0, symbol = ''} = args ? args : {};
        this.balance = balance
        this.rate = rate
        this.currency = currency
        this.id = id;
        this.symbol = symbol ;
    }

    convert(value:number | string, toWallet: IWallet) : number | null{
        const converted = _convert(value, this, toWallet, 'USD');
        return converted ? formateDecimalPlaces(converted) : null;
    }
}