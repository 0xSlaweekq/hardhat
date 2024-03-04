// import fs from 'fs';
import { ethers, run, tenderly } from 'hardhat';

async function main() {
  //deploy token
  const token = await ethers.deployContract('Profit');
  await token.waitForDeployment();
  const address = await token.getAddress();

  await tenderly.persistArtifacts({
    name: 'Profit',
    address: token.address
  });
  await new Promise(r => setTimeout(r, 5000));
  await tenderly.verify({
    address: address,
    name: 'Profit'
  });
  console.log('Token deployed to', address);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
