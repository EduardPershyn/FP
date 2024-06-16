import FrenPet from "../abi/FrenPet";
import FrenPetToken from "../abi/FrenPetToken";
import web3 from '../web3';

import { fpAddress, tokenAddress } from '../config/config';

class FrenPetTest {
    account = "";

    Mint = async () =>
    {
        console.log(await FrenPet.methods.balanceOf(this.account).call());

        var price = await FrenPet.methods.getPrice().call();

        await FrenPetToken.methods.approve(fpAddress, price).send({from: this.account});
        await FrenPet.methods.mint().send({from: this.account});
    }

    Level = async () =>
    {
        var tokenId = 0;

        //var level = await FrenPet.methods.owner().call();
        var level = await FrenPet.methods.level(tokenId).call();
        console.log("level ", level);
    }
}

export default FrenPetTest;