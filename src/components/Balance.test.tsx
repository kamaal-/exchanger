import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import BalanceComponent from './Balance'
import {WalletType} from '../interfaces_types/types'
import { render, fireEvent, waitForElement, waitForDomChange } from '@testing-library/react'
import rootReducer from '../services/reducers/index'
import {balances, balances_ok} from '../__mocks__/wallets'



describe('Balance component', () => {
    function renderWithRedux(
        ui,
        { initialState, store = createStore(() => ({Wallets:{balances}})) } = {}
      ) {
        return {
          ...render(<Provider store={store}>{ui}</Provider>),
          // adding `store` to the returned utilities to allow us
          // to reference it in our tests (just try to avoid using
          // this to test implementation details).
          store,
        }
    }

    it('renders with initial state without crashing', () => {
        const { getByTestId } = renderWithRedux(<BalanceComponent type={WalletType.From} />)
        expect(getByTestId(`${WalletType.From}-balance`).textContent).toBe('You will have 10.23 EUR')
    });

    it('should match snapshot', () => {
        const { asFragment } = renderWithRedux(<BalanceComponent type={WalletType.From} />)
        expect(asFragment()).toMatchSnapshot();
    });
})

describe('Balance component without data', () => {
    function renderWithRedux(
        ui,
        { initialState, store = createStore(() => ({Wallets:{}})) } = {}
      ) {
        return {
          ...render(<Provider store={store}>{ui}</Provider>),
          // adding `store` to the returned utilities to allow us
          // to reference it in our tests (just try to avoid using
          // this to test implementation details).
          store,
        }
    }
    

    it('should not render at all', () => {
        const { wrapper } = renderWithRedux(<BalanceComponent type={WalletType.From} />)
        expect(wrapper).toBe(undefined)
    });
})