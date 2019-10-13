import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Input from './Input'
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

    it('renders with initial state without crashing', () => {
        const { getByTestId } = renderWithRedux(<Input wallet={wallet} theme={Theme.Light} exchangeWallet={wallets[1]} setButtonState={() => {}} />)
        expect(getByTestId(`EUR-input`).textContent).toBe('€')

    });

    it('should match snapshot', () => {
        const { asFragment } = renderWithRedux(<Input wallet={wallet} theme={Theme.Light} exchangeWallet={wallets[1]} setButtonState={() => {}} />)
        expect(asFragment()).toMatchSnapshot();
    });

    it('should not render at all', () => {
        const { wrapper } = renderWithRedux(<Input wallet={wallet} theme={Theme.Light} exchangeWallet={wallets[1]} setButtonState={() => {}} />)
        expect(wrapper).toBe(undefined)
    });
})