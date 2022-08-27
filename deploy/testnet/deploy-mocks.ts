import { deployments, getNamedAccounts, network } from 'hardhat';
import {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} from '../../helpers/network-config';

module.exports = async () => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    if (developmentChains.includes(String(network.name))) {
        log('Local network detected! Deploying mock...');

        await deploy('MockV3Aggregator', {
            contract: 'MockV3Aggregator',
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        });

        log('Mock deployed...');
        log('............................................');
    }
};

module.exports.tags = ['all', 'mock'];
