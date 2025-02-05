// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Decentralized Identity and Verification Platform
 * @dev Enables users to register identities and verifiers (e.g., banks) to approve them.| By MUA
 */
contract DecentralizedIdentity {
    
    struct Identity {
        address owner;
        string name;
        string documentHash; 
        bool isVerified;
        address verifiedBy;
    }
    
    address public admin; // Platform admin
    mapping(address => Identity) public identities;
    mapping(address => bool) public authorizedVerifiers; // Banks or authorities

    event IdentityCreated(address indexed user, string name);
    event IdentityVerified(address indexed user, address verifier);
    event IdentityRevoked(address indexed user);
    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyVerifier() {
        require(authorizedVerifiers[msg.sender], "Not an authorized verifier");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerIdentity(string memory _name, string memory _documentHash) public {
        require(identities[msg.sender].owner == address(0), "Identity already exists");
        
        identities[msg.sender] = Identity({
            owner: msg.sender,
            name: _name,
            documentHash: _documentHash,
            isVerified: false,
            verifiedBy: address(0)
        });

        emit IdentityCreated(msg.sender, _name);
    }

    function verifyIdentity(address _user) public onlyVerifier {
        require(identities[_user].owner != address(0), "Identity does not exist");
        require(!identities[_user].isVerified, "Already verified");

        identities[_user].isVerified = true;
        identities[_user].verifiedBy = msg.sender;

        emit IdentityVerified(_user, msg.sender);
    }

    function revokeIdentity(address _user) public onlyVerifier {
        require(identities[_user].isVerified, "Identity is not verified");

        identities[_user].isVerified = false;
        identities[_user].verifiedBy = address(0);

        emit IdentityRevoked(_user);
    }

    function addVerifier(address _verifier) public onlyAdmin {
        authorizedVerifiers[_verifier] = true;
        emit VerifierAdded(_verifier);
    }

    function removeVerifier(address _verifier) public onlyAdmin {
        authorizedVerifiers[_verifier] = false;
        emit VerifierRemoved(_verifier);
    }

    function getIdentity(address _user) public view returns (Identity memory) {
        return identities[_user];
    }
}