const { ethers } = require("hardhat");

async function main() {
    console.log("Deploying DecentralizedIdentity contract...");

    // Get the contract factory
    const IdentityContract = await ethers.getContractFactory("DecentralizedIdentity");

    // Deploy the contract
    const identity = await IdentityContract.deploy();
    await identity.waitForDeployment();

    // Get contract address
    const contractAddress = await identity.getAddress();
    console.log(`Contract deployed at: ${contractAddress}`);
}

// Run the script
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error("Deployment failed:", error);
        process.exit(1);
    });
