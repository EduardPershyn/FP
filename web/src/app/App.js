import React from "react";
import web3 from "../web3";

import logo from '../logo.svg';
import '../App.css';

import FrenPet from "../abi/FrenPet";

import FrenPetTest from './FrenPetTest';

import { fpAddress } from '../config/config';

class App extends React.Component {
    frenPetTest = new FrenPetTest();

    async componentDidMount() {
        var accounts = await web3.eth.getAccounts();
        this.account = accounts[0];
        this.frenPetTest.account = this.account;

        document.getElementById('wallet').textContent = this.account;

        document.getElementById('mint').onclick = () => {this.frenPetTest.Mint()};
        document.getElementById('level').onclick = () => {this.frenPetTest.Level()};
    }

    //            <div>
    //                <button id="myNfts">Show My Nft Ids</button>
    //                <p>Owned Nfts: <span id="ownedNfts"></span></p>
    //            </div>

  render() {
    return (
        <div>
            <div>
                <p>Wallet: <span id="wallet"></span></p>
                <button id="mint">Mint</button>
            </div>
            <div>
                <button id="level">Level</button>
            </div>
            <hr/>
        </div>
    );
  }
}

export default App;
