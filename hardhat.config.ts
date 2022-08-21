import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';
import { blockNumber } from './tasks/block-number';

// CUSTOM TASKS
blockNumber();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
    solidity: '0.8.9',
    defaultNetwork: 'hardhat',
    networks: {
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [GOERLI_PRIVATE_KEY!],
        },
    },

    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
};

export default config;
