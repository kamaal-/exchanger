import {GET_RATES, RATE} from '../action_types/'
import {RatesState, Action} from '../../interfaces_types/types'

export const initialState:RatesState = {
    rates: null,
    fromRate: null,
    toRate: null,
    error: null,
    base: null
}

export default (state = initialState, {type, payload}: Action) => {
    switch(type){
        case GET_RATES.STARTED:
            return {...state, rates: null, error: null}
        case GET_RATES.SUCCESS:
            return {...state, rates: payload.rates, error: null, base: payload.base}
        case GET_RATES.ERROR:
            return {...state, error: payload}
        case RATE.SET_FROM:
            return {...state, fromRate: payload}
        case RATE.SET_TO:
            return {...state, toRate: payload}
        case RATE.SWITCH:
            return {...state, fromRate: state.toRate, toRate: state.fromRate}
        case RATE.RESET:
            return {...state, fromRate: null, toRate: null}
        default:
            return {...state}
    }
}