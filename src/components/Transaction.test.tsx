import React from 'react'
import Transaction from './Transaction'
import { render } from '@testing-library/react'
import {transactions} from '../__mocks__/wallets'

describe('Transaction component', () => {

    it('should match snapshot', () => {
        const { asFragment } = render(<Transaction transaction={transactions[0]}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders with currency logo from', () => {
        const { getByTestId } = render(<Transaction transaction={transactions[0]}/>)
        expect(getByTestId(`transation-currency`).textContent).toBe('kr')
    });

    it('renders with currency logo to', () => {
        const { getByTestId } = render(<Transaction transaction={transactions[0]}/>)
        expect(getByTestId(`transation-currency-2`).textContent).toBe('RM')
    });

    it('renders with details', () => {
        const { getByTestId } = render(<Transaction transaction={transactions[0]}/>)
        expect(getByTestId(`transation-details`).textContent).toBe('You have transfered 34 kr to RM.')
    });

    it('renders with exchange', () => {
        const { getByTestId } = render(<Transaction transaction={transactions[0]}/>)
        expect(getByTestId(`transation-balance`).textContent).toBe('1 kr = 0.42 RM')
    });

    it('renders with exchange history from', () => {
        const { getByTestId } = render(<Transaction transaction={transactions[0]}/>)
        expect(getByTestId(`transation-history-from`).textContent).toBe('100 kr → 34 kr → 66 kr')
    });

    it('renders with exchange history to', () => {
        const { getByTestId } = render(<Transaction transaction={transactions[0]}/>)
        expect(getByTestId(`transation-history-to`).textContent).toBe('200 RM → 14.47 RM → 214.47 RM')
    });

    it('renders with exchange date', () => {
        const { getByTestId } = render(<Transaction transaction={transactions[0]}/>)
        expect(getByTestId(`transation-date`).textContent).toBe('13/10/2019 19:06')
    });
})