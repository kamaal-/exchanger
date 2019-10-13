import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import WalletChanger from './WalletChanger'
import { WalletSides } from '../interfaces_types/types'
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
        return renderWithRedux(<WalletChanger toWallet={wallets[1]} fromWallet={wallet} leftWallet={wallet} rightWallet={wallets[1]} wallets={wallets} side={WalletSides.Left}/>)
    }

    it('should match snapshot', () => {
        const { asFragment } = setup();
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render with logo', () => {
        const {getByTestId} = setup();
        expect.assertions(3);
        expect(getByTestId(`walletchanger-logo-0-leftWallet`).textContent).toBe('€');
        expect(getByTestId(`walletchanger-logo-1-leftWallet`).textContent).toBe('$');
        expect(getByTestId(`walletchanger-logo-2-leftWallet`).textContent).toBe('l');
    });

});