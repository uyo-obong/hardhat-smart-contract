import { deepCopy } from 'ethers/lib/utils';
import { deployments, getNamedAccounts, network } from 'hardhat';
import { developmentChains, NetworkConfig } from '../../helpers/network-config';
import { verifyContract } from '../../utils/verify';

module.exports = async () => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    // const ethUsdPriceFeed =
    //     chainId != undefined
    //         ? NetworkConfig[chainId as keyof typeof NetworkConfig][
    //               'ethUsdPriceFeedAddress'
    //           ]
    //         : '';

    let ethUsdPriceFeedAddress;
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get('MockV3Aggregator');
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    } else {
        ethUsdPriceFeedAddress =
            NetworkConfig[chainId as keyof typeof NetworkConfig][
                'ethUsdPriceFeedAddress'
            ];
    }

    const args = [ethUsdPriceFeedAddress];
    const fundMe = await deploy('Transaction', {
        from: deployer,
        args: args,
        log: true,
    });

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY != undefined
    ) {
        await verifyContract(fundMe.address, args);
    }

    log('------------------------------------------------------------------');
};

module.exports.tags = ['all', 'fundme'];
