import React, { useEffect} from 'react';
import { WalletSides} from './interfaces_types/types'
import './App.css';
import {StoreState} from './interfaces_types/types'
import {connect} from 'react-redux'
import {init} from './services/actions/app'
import {WalletRow} from './theme'
import WalletGroup from './components/WalletGroup'
import TransactionsList from './components/TransactionsList'

type Props = {
  init: () => void;
}

const App = ({init}:Props) => {
  useEffect(() => {
    init()
    return () => {};
  });
  return (
    <div className="App">
      <WalletRow>
        <WalletGroup side={WalletSides.Left}/>
        <WalletGroup side={WalletSides.Right}/>
      </WalletRow> 
      <TransactionsList/>
    </div>
  );
}

export default connect((state:StoreState) => ({}), {init})(App);
