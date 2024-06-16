import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FrenPetModule = buildModule("FrenPetModule", (m) => {
  const account0 = m.getAccount(0);
  //console.log(account0);

  const FrenPetToken = m.contract("FrenPetToken", [], { from: account0 });
  const FrenPet = m.contract("FrenPet", [FrenPetToken], { from: account0 });
  const GameManager = m.contract("GameManager", [FrenPet], { from: account0 });

  m.call(FrenPet, "setGameManager", [GameManager], { from: account0 });

  return { FrenPetToken, FrenPet, GameManager };
});

export default FrenPetModule;

// const FrenPetToken = buildModule("FrenPetToken", (m) => {
//   const token = m.contract("FrenPetToken");
//
//   return { token };
// });
//
// const FrenPet = buildModule("FrenPet", (m) => {
//   const { token } = m.useModule(FrenPetToken);
//   const FrenPet = m.contract("FrenPet", [token]);
//
//   return { FrenPet };
// });
//
// export default FrenPet;