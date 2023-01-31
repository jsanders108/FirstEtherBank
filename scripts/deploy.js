
const hre = require("hardhat");

async function main() {

  const FirstEtherBank = await hre.ethers.getContractFactory("FirstEtherBank");
  const firstEtherBank = await FirstEtherBank.deploy();

  await firstEtherBank.deployed();

  console.log(
    `FirstEtherBank contract deployed to ${firstEtherBank.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
