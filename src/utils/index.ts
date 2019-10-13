import {NullableRates, ConverterArgs, NullableNumber, PairWallets, NullableString} from '../interfaces_types/types'
import IWallet from '../interfaces_types/Wallet'
import Wallet from '../services/models/Wallet'
import Rates from '../interfaces_types/Rates'
import {symbolsMap} from './constants'

(function (){
    interface Number {
        toFixedTruncate(digits: number): number;
    }
    //@ts-ignore 
    //eslint-disable-next-line
    Number.prototype.toFixedTruncate = function(digits:number) {
        const regex = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)");
        const isMatch = this.toString().match(regex);
        return isMatch ? parseFloat(isMatch[1]) : this.valueOf();
    }
}());

export const getRate = (type:string, rates: NullableRates) => rates && rates[type] ? rates[type] : null;

export const getRates = (from:string, to: string, rates: NullableRates, base:string): NullableNumber =>{
    const fromRate = getRate(from, rates);
    const toRate = getRate(to, rates);
    if(fromRate && toRate){
        if(from === base) return toRate.rate;
        
        if(to === base) return fromRate.rate;

        return  toRate.rate * (1 / fromRate.rate)
    }
    return null;
}

export const toNumber = (str:any, fallBack = 1) => !isNaN(Number(str)) ? Number(str) : fallBack;

//@ts-ignore
export const formateDecimalPlaces = (numberValue:number, places:number = 2): number => parseFloat(toNumber(`${numberValue}`).toFixedTruncate(places));

export const convert = (args:ConverterArgs):NullableNumber => {
    if(!args) return 0;
    const {rates, base, fromType, toType, value, decimalPlaces} = args;
    if(!rates || !fromType || !toType) return 0;
    const result:NullableNumber = getRates(fromType, toType, rates, base ? base : 'USD');
    return formateDecimalPlaces((typeof value === 'number' ? value * (result ? result : 1) : 0), decimalPlaces ? decimalPlaces: 2);
}

export const withCurrency = (value:number, currency:string, places: number = 2):string => {
    const regex = new RegExp("(\\d+\\.\\d{" + places + "})(\\d)");
    const isMatch = value.toString().match(regex);
    return isMatch ? `${value} ${currency}` : `${value}.00 ${currency}`;
}

export const insertValue = (rates:Rates, base:string, value:number, fromWallet:IWallet, toWallet:IWallet):PairWallets => {
    const addTo = convert({rates, base, fromType: fromWallet.currency, toType: toWallet.currency, value})
    return {
        fromWallet: {...fromWallet, balance: fromWallet.balance - value},
        toWallet: {...toWallet, balance: toWallet.balance + (addTo ? addTo : 0)}
    }
}

export const simplifyTransaction = ({fromWallet, toWallet}:PairWallets, value: number):string => {
    return `Exchanged ${value} ${fromWallet.currency} to ${toWallet.currency}`
}

export const updateWalletsWithNewRates = (wallets: IWallet[], rates: Rates) => {
    return (wallets || []).map((wallet:IWallet) => {
        const rate = rates[wallet.currency];
        return {...wallet, rate};
    })
}

export const createWalletsWithRates = (currencies: any, rates: Rates): IWallet[] => {
    return Object.keys(rates)
    .map((key, i) => {
        const found = currencies.find((c:string[])  => c[0] === key);
        const symbol:string = symbolsMap[key];
        return new Wallet({
            currency: key,
            rate: rates[key].rate,
            symbol,
            balance: found ? found[1] : 0
        }, found ? found[2] : i)
    }).filter(f => f.balance)
}

export const validateNumberWithTwoDecimalPoints = (input:NullableString):NullableString => {
    if(!input) return null;
    const match = input.trim().match(/^([\d]+)(\.)?([\d]{1})?([\d]{1})?$/g); 
    return match ? match[0] : match;
}

export const checkAmountIsExeedingBalance = (amount: NullableString | number, balance:number): NullableNumber => {
    if(!amount) return null;
    return (toNumber(balance) >= toNumber(amount)) ? toNumber(amount) : null;
}

export const saveInLocalStorage = (key:string, object:any):Promise<string> => {
    
    return new Promise((resolve, reject) => {
        try{
            localStorage.setItem(key, JSON.stringify(object));
            resolve('Done');
        }catch(error){
            resolve(error);
        }
    })
}

export const _getRate= (fromWallet:IWallet, toWallet:IWallet, base: string):number => {
    if(fromWallet && toWallet){
       return rateConversion(fromWallet.rate, toWallet.rate)
    }
    return 1;
}

export const _convert = (value: number | string, fromWallet:IWallet, toWallet:IWallet, base: string): NullableNumber => {
    return toNumber(value) * _getRate(fromWallet, toWallet, base)
}

export const rateConversion = (fromRate:number|string, toRate:number|string):number => toNumber(toRate) * (1 / toNumber(fromRate))
