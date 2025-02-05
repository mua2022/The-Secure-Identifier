const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DecentralizedIdentity", function () {
  let IdentityContract, identity, owner, verifier, user;

  beforeEach(async function () {
    [owner, verifier, user] = await ethers.getSigners();
    IdentityContract = await ethers.getContractFactory("DecentralizedIdentity");
    identity = await IdentityContract.deploy(); // Deploy the contract
    await identity.waitForDeployment(); // Ensure deployment is complete
});


  it("Should allow a user to register an identity", async function () {
    await identity.connect(user).registerIdentity("Alice", "hash123");
    const userIdentity = await identity.getIdentity(user.address);
    
    expect(userIdentity.owner).to.equal(user.address);
    expect(userIdentity.name).to.equal("Alice");
    expect(userIdentity.documentHash).to.equal("hash123");
    expect(userIdentity.isVerified).to.equal(false);
  });

  it("Should allow admin to add a verifier", async function () {
    await identity.connect(owner).addVerifier(verifier.address);
    expect(await identity.authorizedVerifiers(verifier.address)).to.equal(true);
  });

  it("Should allow verifier to verify an identity", async function () {
    await identity.connect(user).registerIdentity("Alice", "hash123");
    await identity.connect(owner).addVerifier(verifier.address);
    await identity.connect(verifier).verifyIdentity(user.address);
    
    const userIdentity = await identity.getIdentity(user.address);
    expect(userIdentity.isVerified).to.equal(true);
    expect(userIdentity.verifiedBy).to.equal(verifier.address);
  });

  it("Should allow verifier to revoke an identity", async function () {
    await identity.connect(user).registerIdentity("Alice", "hash123");
    await identity.connect(owner).addVerifier(verifier.address);
    await identity.connect(verifier).verifyIdentity(user.address);
    await identity.connect(verifier).revokeIdentity(user.address);

    const userIdentity = await identity.getIdentity(user.address);
    expect(userIdentity.isVerified).to.equal(false);
    expect(userIdentity.verifiedBy).to.equal(ethers.ZeroAddress);
});

  it("Should not allow non-verifiers to verify an identity", async function () {
    await identity.connect(user).registerIdentity("Alice", "hash123");
    await expect(identity.connect(user).verifyIdentity(user.address)).to.be.revertedWith("Not an authorized verifier");
  });

  it("Should not allow non-admins to add verifiers", async function () {
    await expect(identity.connect(user).addVerifier(verifier.address)).to.be.revertedWith("Only admin can perform this action");
  });

  it("Should not allow duplicate identity registration", async function () {
    await identity.connect(user).registerIdentity("Alice", "hash123");
    await expect(identity.connect(user).registerIdentity("Alice", "hash456")).to.be.revertedWith("Identity already exists");
  });
});
