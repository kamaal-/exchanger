import {Rate} from './types'
export default interface Wallet extends Rate {
    symbol: string;
    balance: number;
    id?:number;
    convert? :(value:number, exchangeWallet:Wallet) => number | null;
}