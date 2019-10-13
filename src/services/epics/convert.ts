import { ofType } from 'redux-observable';
import {OperatorFunction, Observable} from 'rxjs'
import { mergeMap, distinctUntilChanged, debounceTime } from 'rxjs/operators'
import {CONVERT} from '../action_types'
import {_convert, toNumber, formateDecimalPlaces} from '../../utils/'
import Wallet from '../../interfaces_types/Wallet';
import {BalancePair} from '../../interfaces_types/types';

type SourceAction = {
    type: string;
    payload: {
        fromWallet: Wallet;
        toWallet: Wallet;
        input: string;
    }
}

type PayloadAction = {
    type: string;
    payload: BalancePair
}

const calculateDiff = (source: SourceAction):PayloadAction => {
    const {input, fromWallet, toWallet} = source.payload
    const toDiff = _convert(input, fromWallet, toWallet, 'base') || 0;
    return {
        type: CONVERT.RUN,
        payload: {
            'fromWallet': {
                currency: fromWallet.currency,
                balance: fromWallet.balance - toNumber(input),
                diff: toNumber(input),
                label: 'Balance'
            },
            'toWallet': {
                currency: toWallet.currency,
                balance: toWallet.balance + toNumber(formateDecimalPlaces(toDiff)),
                diff: toNumber(toDiff),
                label: 'Balance'
            }
        }
    }
}

export function convertCurrency(): OperatorFunction<SourceAction, PayloadAction> {
    return (source$ => {
        return new Observable<PayloadAction>(observer => {
            const wrapper = {
                next: (value:SourceAction) => {
                  observer.next(calculateDiff(value));
                },
                error: observer.error,
                complete: observer.complete
            }
            return source$.pipe().subscribe(wrapper);
        });
    })
};

export default (action$:any) => action$.pipe(
    ofType(CONVERT.DO),
    debounceTime(300),
    distinctUntilChanged(),
    convertCurrency(),
    mergeMap(action => {
        return Promise.resolve(action)
    })
);