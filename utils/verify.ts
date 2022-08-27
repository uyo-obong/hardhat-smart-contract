import { run } from 'hardhat';

export const verifyContract = async (contractAddress: any, args: any) => {
    try {
        console.log('contract verification in progress...');
        await run('verify:verify', {
            address: contractAddress,
            constructorArgument: args,
        });
    } catch (error) {
        console.log(error);
        // if (error.message.toLowerCase().includes('already verified')) {
        //     console.log('Already verified');
        // } else {
        //     console.log(error);
        // }
    }
};

module.exports = {
    verifyContract,
};
