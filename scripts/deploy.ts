// const fs = require('fs');
import { ethers, run } from 'hardhat';

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // let Data = JSON.parse(fs.readFileSync(`./data.json`));
  // const data = Data[0];
  //deploy token
  const Token = await ethers.getContractFactory('Profit');
  const token = await Token.deploy();
  await token.deployed();
  console.log('deployed to:', token.address);

  // const token = await ethers.deployContract('TokenERC20');
  // await token.waitForDeployment();
  // console.log(`Token deployed to ${token.target}`);

  //verify Token
  // await new Promise(r => setTimeout(r, 5000));
  // await run('verify:verify', {
  //   address: token.address,
  //   constructorArguments: []
  // });
  // fs.writeFileSync(`./data.json`, JSON.stringify(newData, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
