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

import { HardhatUserConfig } from 'hardhat/config';

// import * as tdly from '@tenderly/hardhat-tenderly';
// tdly.setup({ automaticVerifications: false });

import {
  apiKeys,
  customChains,
  networks,
  REPORT_GAS,
  TOKEN,
  GAS_PRICE_API,
  COINMARKETCAP_API_KEY,
  DEFAULT_COMPILER_SETTINGS
} from './config';

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
  networks: {
    hardhat: networks.hardhat,
    localhost: networks.localhost,
    tenderly: networks.tenderly
  },
  // tenderly: {
  //   project: 'project',
  //   username: 'slaweekq',
  //   forkNetwork: '1',
  //   privateVerification: false,
  //   deploymentsDir: 'deployments',
  //   accessKey: process.env.TENDERLY_ACCESS_KEY
  // },
  etherscan: {
    apiKey: {
      hardhat: apiKeys.hardhat,
      localhost: apiKeys.localhost,
      mainnet: apiKeys.mainnet,
      goerli: apiKeys.goerli,
      bsc: apiKeys.bsc,
      bscTestnet: apiKeys.bscTestnet,
      polygon: apiKeys.polygon
    },
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
