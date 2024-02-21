import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-contract-sizer';
import 'hardhat-abi-exporter';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-deploy';

import path from 'path';
import { HardhatUserConfig } from 'hardhat/config';

// import * as tdly from '@tenderly/hardhat-tenderly';
// tdly.setup({ automaticVerifications: false });

const envConfig = require('dotenv').config({ path: path.resolve('./', '.env') });
const {
  POLYGONSCAN_API_KEY,
  INFURA_API_KEY,
  MNEMONIC,
  NODE_HOST,
  FORKING_BLOCKNUMBER,
  PORT,
  FORKING_NETWORK_ID,
  TENDERLY_API_KEY,
  BSCSCAN_API_KEY,
  ETHERSCAN_API_KEY,
  REPORT_GAS,
  TOKEN,
  GAS_PRICE_API,
  COINMARKETCAP_API_KEY
} = envConfig.parsed || {};

import { apiKeys, customChains, networks, DEFAULT_COMPILER_SETTINGS } from './config';

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
  // tenderly: {
  //   project: 'project',
  //   username: 'slaweekq',
  //   forkNetwork: '1',
  //   privateVerification: false,
  //   deploymentsDir: 'deployments',
  //   accessKey: process.env.TENDERLY_ACCESS_KEY
  // },
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
    format: 'json'
  },
  gasReporter: {
    enabled: REPORT_GAS === ('true' || true) ? true : false,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: TOKEN,
    gasPriceApi: GAS_PRICE_API,
    showTimeSpent: true,
    maxMethodDiff: 10,
    src: './build/reports',
    outputFile: './build/gas_usage.md'
  },
  mocha: {
    timeout: 100000
  }
};
export default config;
