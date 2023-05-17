import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-verify";
import "@matterlabs/hardhat-zksync-solc";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-solhint";
import "hardhat-gas-reporter";
require('dotenv').config()

const zkSyncTestnet =
  process.env.NODE_ENV == "test"
    ? {
        url: "http://localhost:3050",
        ethNetwork: "http://localhost:8545",
        zksync: true,
      }
    : {
        url: "https://testnet.era.zksync.dev",
        ethNetwork: "goerli",
        zksync: true,
        verifyURL: 'https://testnet-explorer.zksync.dev/contract_verification'
      };

module.exports = {
  // hardhat-zksync-solc
  // The compiler configuration for zkSync artifacts.
  zksolc: {
    version: "latest",
    compilerSource: "binary",
    settings: {
      compilerPath: "./zksolc-linux-amd64-musl-v1.3.5",
    },
  },

  // The compiler configuration for default artifacts.
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yul: false
        }
      },
    }
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },

  defaultNetwork: 'zksyncTestnet',
  networks: {
    hardhat: {
      chainId: 280,
      gasMultiplier: 0,
      initialBaseFeePerGas: 0,
    },

    goerli: {
      url: "https://endpoints.omniatech.io/v1/eth/goerli/public"
    },

    mainnet: {
      url: "https://eth.llamarpc.com"
    },

    zkSyncTestnet,

    zkSyncMainnet: {
      zksync: true,
      ethNetwork: "mainnet",
      url: 'https://zksync2-mainnet.zksync.io',
      verifyURL: 'https://zksync2-mainnet-explorer.zksync.io/contract_verification'
    },

    baseGoerli: {
      url: "https://goerli.base.org",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },

    scrollTestnet: {
      url: "https://alpha-rpc.scroll.io/l2",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },

    polygonTestnet: {
      url: "https://rpc.public.zkevm-test.net",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },
  mocha: {
    timeout: 40000
  },
};