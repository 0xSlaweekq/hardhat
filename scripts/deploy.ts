// const fs = require('fs');
import hre, { ethers, run } from 'hardhat';

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // let Data = JSON.parse(fs.readFileSync(`./data.json`));
  // const data = Data[0];
  //deploy token
  // const Token = await ethers.getContractFactory('Profit');
  // const token = await Token.deploy();
  // await token.deployed();
  // console.log(`Token deployed to ${token.address}`);

  // let token = await ethers.deployContract('Profit');
  // token = await token.waitForDeployment();

  const token = await ethers.deployContract('Profit');
  await token.waitForDeployment();
  console.log('Token deployed to', await token.getAddress());

  //verify Token
  const address = await token.getAddress();
  await new Promise(r => setTimeout(r, 5000));
  await hre.tenderly.persistArtifacts({ name: 'Profit', address });
  // await run('verify:verify', { address, constructorArguments: [] });

  // fs.writeFileSync(`./data.json`, JSON.stringify(newData, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
