// import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Profit', function () {
  before(async function () {
    this.Profit = await ethers.getContractFactory('Profit');
    this.profit = await this.Profit.deploy();
    await this.profit.deployed();
  });

  // beforeEach(async function () {});

  // Test case
  it('retrieve returns a value previously stored', async function () {
    await this.profit.sendTransaction(0, 100);

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    // expect((await this.profit.retrieve()).toString()).to.equal('42');
  });
});
