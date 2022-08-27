import { ethers, run, network } from 'hardhat';
import 'dotenv/config';

async function main() {
    const factory = await ethers.getContractFactory('SimpleStorage');

    console.log(`deploying....`);
    const simple_storage = await factory.deploy();
    await simple_storage.deployed();

    console.log(`deploying contract to: ${simple_storage.address}`);

    if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
        await simple_storage.deployTransaction.wait(6); // wait 6 block before processing verification
        await verifyContract(simple_storage.address, []);
    }

    const retrieve = await simple_storage.retrieve();
    console.log(retrieve.toString());
    const createValue = await simple_storage.create('90');
    await createValue.wait(1);

    const updateValue = await simple_storage.retrieve();
    console.log(updateValue.toString());
}

async function verifyContract(contractAddress: any, args: any) {
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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
