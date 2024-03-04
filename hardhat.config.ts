import 'hardhat-deploy';
import 'hardhat-abi-exporter';
import 'hardhat-gas-reporter';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import '@openzeppelin/hardhat-upgrades';
import '@typechain/hardhat';
import 'solidity-coverage';
import 'hardhat-contract-sizer';

import path from 'path';
import { HardhatUserConfig } from 'hardhat/config';

import * as tdly from '@tenderly/hardhat-tenderly';
import { apiKeys, customChains, DEFAULT_COMPILER_SETTINGS, networks } from './config';

tdly.setup({ automaticVerifications: true });

const envConfig = require('dotenv').config({
  path: path.resolve('./', '.env')
});


const {
  COINMARKETCAP_API_KEY,
  ETHERSCAN_API_KEY,
  FORKING_BLOCKNUMBER,
  FORKING_NETWORK_ID,
  GAS_PRICE_API,
  INFURA_API_KEY,
  MNEMONIC,
  NODE_HOST,
  PORT,
  REPORT_GAS,
  TOKEN,
  TENDERLY_API_KEY,
  POLYGONSCAN_API_KEY,
  BSCSCAN_API_KEY,TENDERLY_ACCESS_KEY
} = envConfig.parsed || {};

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  paths: {
    tests: './tests',
    artifacts: './build/artifacts',
    cache: './build/cache',
    deployments: 'deployments'
  },
  typechain: {
    outDir: './build/typechain',
    target: 'ethers-v5'
  },
  networks: networks(
    INFURA_API_KEY,
    MNEMONIC,
    NODE_HOST,
    FORKING_BLOCKNUMBER,
    PORT,
    FORKING_NETWORK_ID,
    TENDERLY_API_KEY
  ),
  tenderly: {
    project: 'testETH',
    username: 'slaweekq',
    privateVerification: false,
    deploymentsDir: 'deployments',
    accessKey: TENDERLY_ACCESS_KEY
  },
  etherscan: {
    apiKey: apiKeys(ETHERSCAN_API_KEY, POLYGONSCAN_API_KEY, BSCSCAN_API_KEY),
    customChains: customChains
  },
  solidity: DEFAULT_COMPILER_SETTINGS,
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
    outputFile: './build/contractSizer.md'
  },
  namedAccounts: {
    deployer: 0,
    admin: 1
  },
  abiExporter: {
    path: './build/abis',
    runOnCompile: true,
    clear: true,
    flat: true,
    only: [],
    spacing: 2,
    pretty: true
  },
  gasReporter: {
    enabled: REPORT_GAS === ('true' || true) ? true : false,
    outputFile: './build/gas_usage.md',
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: TOKEN,
    gasPriceApi: GAS_PRICE_API,
    showTimeSpent: true,
    maxMethodDiff: 10
  },
  mocha: {
    timeout: 100000
  }
};
export default config;
