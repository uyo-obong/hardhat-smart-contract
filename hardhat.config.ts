import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';
import './tasks/block-number';
import 'hardhat-deploy';
import { blockNumber } from './tasks/block-number';
import { network } from 'hardhat';

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
    solidity: {
        compilers: [{ version: '0.8.9' }, { version: '0.6.6' }],
    },
    defaultNetwork: 'hardhat',
    networks: {
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [GOERLI_PRIVATE_KEY!],
            chainId: 5,
        },
        localhost: {
            url: 'http://127.0.0.1:8545/',
            chainId: 31337,
        },
    },

    gasReporter: {
        enabled: true,
        currency: 'USD',
    },

    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
        },
    },

    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
};

export default config;
