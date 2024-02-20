// import fs from 'fs';
import { ethers, run } from 'hardhat';

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // let Data = JSON.parse(fs.readFileSync('./scripts/data.json'));
  //deploy token
  const Token = await ethers.getContractFactory('Profit');
  const token = await Token.deploy();
  await token.deployed();
  const address = token.address;

  // const token = await ethers.deployContract('Profit');
  // await token.waitForDeployment();
  // const address = await token.getAddress();
  console.log('Token deployed to', address);

  // const newData = { ...Data, token: address };
  // fs.writeFileSync(`./scripts/data.json`, JSON.stringify(newData, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
