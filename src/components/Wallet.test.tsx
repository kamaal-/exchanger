import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Wallet from './Wallet'
import { Theme} from '../interfaces_types/types'
import { render } from '@testing-library/react'
import {balances, wallets} from '../__mocks__/wallets'

const wallet = wallets[0];

describe('Input component', () => {
    function renderWithRedux(
        ui,
        { _, store = createStore(() => ({Wallets:{balances}})) } = {}
      ) {
        return {
          ...render(<Provider store={store}>{ui}</Provider>),
          // adding `store` to the returned utilities to allow us
          // to reference it in our tests (just try to avoid using
          // this to test implementation details).
          store,
        }
    }

    const setup = () => {
        return renderWithRedux(<Wallet wallet={wallet} exchangeWallet={wallets[1]} toWallet={wallets[1]} theme={Theme.Light} balances={balances} exchange={() => {}} />)
    }

    it('should match snapshot', () => {
        const { asFragment } = setup();
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render with logo', () => {
        const {getByTestId} = setup()
        expect(getByTestId(`wallet-logo`).textContent).toBe('€')
    });

    it('should render with currency', () => {
        const {getByTestId} = setup()
        expect(getByTestId(`wallet-currency`).textContent).toBe('EUR')
    });

    it('should render with exchange', () => {
        const {getByTestId} = setup()
        expect(getByTestId(`wallet-exchange`).textContent).toBe('')
    });

    it('should render with balance', () => {
        const {getByTestId} = setup()
        expect(getByTestId(`wallet-balance`).textContent).toBe('You have 10.23 EUR')
    });

    it('should render with button', () => {
        const {getByTestId} = setup()
        expect(getByTestId(`wallet-button`).textContent).toBe('EXCHANGE')
    });
});