import ratesReducer, {initialState} from "./rates";
import {GET_RATES, RATE} from '../action_types/index'
import { rates } from '../../__mocks__/rates'

describe("Rates actions", () => {
    it('Should init state', () => {
        expect(ratesReducer(initialState, {type: GET_RATES.STARTED, payload: null})).toEqual(initialState)
    });

    it('Should set failed message with last state', () => {
        expect(ratesReducer(initialState, {type: GET_RATES.ERROR, payload: 'Failed :('})).toEqual({...initialState, error: 'Failed :('})
    })

    it('Should set rates and base', () => {
        expect(ratesReducer(initialState, {type: GET_RATES.SUCCESS, payload: {rates, base: 'USD'}})).toEqual({...initialState, rates, error: null, base: 'USD'})
    })
})

describe("rate actions", () => {
    let state = {...initialState}
    it('Should init state', () => {
        expect(ratesReducer(initialState, {type: GET_RATES.STARTED, payload: null})).toEqual(initialState)
    });

    it('Should set fromState', () => {
        state = {...state, fromRate: rates['EUR']}
        expect(ratesReducer(initialState, {type: RATE.SET_FROM, payload: rates['EUR']})).toEqual(state)
    });

    it('Should to state', () => {
        const oldState = {...state}
        state = {...state, toRate: rates['GBP']}
        expect(ratesReducer(oldState, {type: RATE.SET_TO, payload: rates['GBP']})).toEqual(state)
    });

    it('Should switch rates', () => {
        const oldState = {...state}
        state = {...state, fromRate: oldState.toRate, toRate: oldState.fromRate}
        expect(ratesReducer(oldState, {type: RATE.SWITCH, payload: rates['GBP']})).toEqual(state)
    });

    it('Should set rates to null', () => {
        const oldState = {...state}
        state = {...state, fromRate: null, toRate: null}
        expect(ratesReducer(oldState, {type: RATE.RESET, payload: rates['GBP']})).toEqual(state)
    });
})