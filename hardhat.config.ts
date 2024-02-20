import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-contract-sizer';
import 'hardhat-abi-exporter';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-change-network';
import 'hardhat-deploy';
import '@chainlink/hardhat-chainlink';
import 'hardhat-gui';

import { HardhatUserConfig } from 'hardhat/config';
import { SolcUserConfig } from 'hardhat/types';
import path from 'path';

// import * as tdly from '@tenderly/hardhat-tenderly';

// tdly.setup({ automaticVerifications: false });

import apiKeys from './config/apiKeys';
import customChains from './config/customChains';
import networks from './config/networks';

const envConfig = require('dotenv').config({ path: path.resolve('./', '.env') });
const { REPORT_GAS, TOKEN, GAS_PRICE_API, COINMARKETCAP_API_KEY, TENDERLY_ACCESS_KEY } =
  envConfig.parsed || {};

/** @type import('hardhat/types').SolcUserConfig */
const DEFAULT_COMPILER_SETTINGS: SolcUserConfig = {
  version: '0.8.22',
  settings: {
    optimizer: {
      enabled: true,
      runs: 1_000
    },
    metadata: {
      bytecodeHash: 'none'
    },
    evmVersion: 'london'
  }
};
/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  paths: {
    tests: './test',
    artifacts: './build/artifacts',
    cache: './build/cache',
    deployments: './build/deployments'
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
  //   deploymentsDir: './build/deployments',
  //   accessKey: TENDERLY_ACCESS_KEY
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
  solidity: {
    compilers: [
      DEFAULT_COMPILER_SETTINGS,
      {
        version: '0.8.16',
        settings: {
          optimizer: { enabled: true, runs: 1_000 },
          metadata: { bytecodeHash: 'none' }
        }
      },
      {
        version: '0.8.0',
        settings: {
          optimizer: { enabled: true, runs: 1_000 },
          metadata: { bytecodeHash: 'none' }
        }
      },
      {
        version: '0.6.0',
        settings: {
          optimizer: { enabled: true, runs: 1_000 },
          metadata: { bytecodeHash: 'none' }
        }
      }
    ]
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
    outputFile: './build/reports/contractSizer.txt'
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
    // maxMethodDiff: 10,
    outputFile: './build/reports/gas_usage/summary.txt'
  },
  mocha: {
    timeout: 100000
  }
};
export default config;
