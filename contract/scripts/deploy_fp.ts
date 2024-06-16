import { ethers } from "hardhat";
import { strDisplay } from "./shared/utils";

export async function main(): Promise<[string]> {
  const LOG = console.log.bind(console);
  let totalGasUsed = 0n;
  const accounts = await ethers.getSigners();
  const account = await accounts[0].getAddress();

  LOG(`> FP deploy`);
  LOG(`> Using account as owner: ${account}`);

  let contract = await (
    await ethers.getContractFactory("FrenPetToken")
  ).deploy();
  await contract.waitForDeployment();
  let receipt = await contract.deploymentTransaction().wait();
  const frenPetToken = receipt.contractAddress;

  LOG(`>> FrenPetToken address: ${frenPetToken}`);
  LOG(`>> FrenPetToken deploy gas used: ${strDisplay(receipt.gasUsed)}`);
  totalGasUsed += receipt.gasUsed;

  console.log(await contract.balanceOf(account));

  let fpContract = await (
    await ethers.getContractFactory("FrenPet")
  ).deploy(frenPetToken);
  await fpContract.waitForDeployment();
  receipt = await fpContract.deploymentTransaction().wait();
  const frenPet = receipt.contractAddress;

  LOG(`>> FrenPet address: ${frenPet}`);
  LOG(`>> FrenPet deploy gas used: ${strDisplay(receipt.gasUsed)}`);
  totalGasUsed += receipt.gasUsed;

  console.log(await fpContract.owner());

    contract = await (
      await ethers.getContractFactory("GameManager")
    ).deploy(frenPet);
    await contract.waitForDeployment();
    receipt = await contract.deploymentTransaction().wait();
    const gameManager = receipt.contractAddress;

    LOG(`>> GameManager address: ${gameManager}`);
    LOG(`>> GameManager deploy gas used: ${strDisplay(receipt.gasUsed)}`);
    totalGasUsed += receipt.gasUsed;

      const tx = await (await fpContract.setGameManager(gameManager)).wait();
      LOG(`>> FrenPet setGameManager gas used: ${strDisplay(tx.gasUsed)}`);
      totalGasUsed += tx.gasUsed;

  LOG(`> FP Total gas used: ${strDisplay(totalGasUsed)}`);



  return frenPet;
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
