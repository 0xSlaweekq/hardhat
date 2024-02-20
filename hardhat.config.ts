import 'hardhat-deploy';
import 'hardhat-abi-exporter';
import 'hardhat-gas-reporter';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import 'solidity-coverage';
import 'hardhat-contract-sizer';
import '@chainlink/hardhat-chainlink';
import 'hardhat-gui';
import * as tdly from '@tenderly/hardhat-tenderly';

import { HardhatUserConfig } from 'hardhat/config';
import { SolcUserConfig } from 'hardhat/types';
import path from 'path';

import apiKeys from './config/apiKeys';
import customChains from './config/customChains';
import networks from './config/networks';

const envConfig = require('dotenv').config({ path: path.resolve('./', '.env') });
const { REPORT_GAS, TOKEN, GAS_PRICE_API, COINMARKETCAP_API_KEY, TENDERLY_API_KEY } =
  envConfig.parsed || {};

tdly.setup({ automaticVerifications: true });

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
  tenderly: {
    project: 'project',
    username: 'slaweekq',
    forkNetwork: '1',
    privateVerification: true,
    deploymentsDir: './build/deployments',
    accessKey: TENDERLY_API_KEY
  },
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
    only: [':ERC20$']
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
    outputFile: 'reports/gas_usage/summary.txt',
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
