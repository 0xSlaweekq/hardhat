import { MultiSolcUserConfig } from 'hardhat/types';

/** @type import('hardhat/types').MultiSolcUserConfig */
const DEFAULT_COMPILER_SETTINGS: MultiSolcUserConfig = {
  compilers: [
    {
      settings: {
        evmVersion: 'london',
        metadata: {
          bytecodeHash: 'none'
        },
        optimizer: {
          enabled: true,
          runs: 1000
        }
      },
      version: '0.8.22'
    },
    {
      settings: {
        metadata: {
          bytecodeHash: 'none'
        },
        optimizer: {
          enabled: true,
          runs: 1000
        }
      },
      version: '0.8.16'
    },
    {
      settings: {
        metadata: {
          bytecodeHash: 'none'
        },
        optimizer: {
          enabled: true,
          runs: 1000
        }
      },
      version: '0.8.0'
    },
    {
      settings: {
        metadata: {
          bytecodeHash: 'none'
        },
        optimizer: {
          enabled: true,
          runs: 1000
        }
      },
      version: '0.6.0'
    }
  ]
};
export default DEFAULT_COMPILER_SETTINGS;
