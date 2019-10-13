import {Rate as IRate} from '../../interfaces_types/types'
import {formateDecimalPlaces} from '../../utils/' 

export default class Rate implements IRate{
    currency: string = '';
    rate:number = 1;
    constructor(args?:IRate, id?:number){
        const {rate = 1, currency = ''} = args ? args : {};
        this.currency = currency;
        this.rate = formateDecimalPlaces(rate);
    }
}  