import FrenPet from "../abi/FrenPet";
import web3 from '../web3';

import { fpAddress } from '../config/config';

class FrenPetTest {
    account = "";

    Mint = async () =>
    {
        await FrenPet.methods.mint().send({from: this.account});
    }

    Level = async () =>
    {
        var tokenId = 0;
        var level = await FrenPet.methods.level(tokenId).call();
        console.log("level ", level);
    }
}

export default FrenPetTest;