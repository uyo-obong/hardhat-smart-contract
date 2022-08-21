import { task } from 'hardhat/config';

export const blockNumber = async () => {
    await task('block-number', 'Show the current block number').setAction(
        async (taskArg, hre) => {
            const block = await hre.ethers.provider.getBlockNumber();
            console.log(`The current block number is ${block}`);
        }
    );
};
