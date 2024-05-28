// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract NightMarket is Ownable {
    struct Option {
        uint256 totalBets;
        mapping(address => uint256) bets;
    }

    uint256 public bettingEndTime;
    uint256 public resultDeclareTime;
    uint256 public totalPool;
    bool public eventEnded;
    uint256 public winningOption;
    string[] public optionNames;
    mapping(uint256 => Option) public options;
    address public creator;

    event BetPlaced(
        address indexed bettor,
        uint256 indexed option,
        uint256 amount
    );
    event ResultDeclared(uint256 indexed winningOption);
    event RewardClaimed(address indexed user, uint256 amount);
    event OwnerWithdrawn(uint256 amount);

    constructor(
        uint256 _bettingEndTime,
        string[] memory _optionNames
    ) Ownable(msg.sender) {
        require(
            _optionNames.length > 0,
            "At least one option must be provided"
        );

        bettingEndTime = _bettingEndTime;
        eventEnded = false;
        creator = msg.sender;

        for (uint256 i = 0; i < _optionNames.length; i++) {
            optionNames.push(_optionNames[i]);
            options[i].totalBets = 0;
        }
    }

    modifier beforeBettingEnd() {
        require(block.timestamp < bettingEndTime, "Betting period has ended");
        _;
    }

    modifier afterBettingEnd() {
        require(
            block.timestamp >= bettingEndTime,
            "Betting period has not ended yet"
        );
        _;
    }

    modifier onlyCreatorOrOwner() {
        require(
            msg.sender == creator || msg.sender == owner(),
            "Only the creator or owner can call this function"
        );
        _;
    }

    function placeBet(uint256 option) external payable beforeBettingEnd {
        require(msg.value >= 0.03 ether, "Minimum bet is 0.03 ETH");
        require(
            msg.value % 0.03 ether == 0,
            "Bet amount must be in increments of 0.03 ETH"
        );
        require(option < optionNames.length, "Invalid option");

        Option storage o = options[option];
        o.bets[msg.sender] += msg.value;
        o.totalBets += msg.value;
        totalPool += msg.value;

        emit BetPlaced(msg.sender, option, msg.value);
    }

    function declareResult(
        uint256 _winningOption
    ) external onlyCreatorOrOwner afterBettingEnd {
        require(_winningOption < optionNames.length, "Invalid option");
        winningOption = _winningOption;
        eventEnded = true;
        emit ResultDeclared(_winningOption);
    }

    function claimReward() external afterBettingEnd {
        require(eventEnded, "Event has not ended yet");
        Option storage o = options[winningOption];
        uint256 userBet = o.bets[msg.sender];
        require(userBet > 0, "No reward to claim");

        uint256 reward = (userBet * totalPool) / o.totalBets;
        o.bets[msg.sender] = 0;
        payable(msg.sender).transfer(reward);

        emit RewardClaimed(msg.sender, reward);
    }

    // Measures to be taken if users are unable to withdraw
    function withdrawOwner() external onlyOwner {
        require(
            block.timestamp >= bettingEndTime + 21 days,
            "Withdrawal period has not started yet"
        );
        uint256 ownerAmount = address(this).balance;
        payable(owner()).transfer(ownerAmount);

        emit OwnerWithdrawn(ownerAmount);
    }

    function canClaimReward(address user) external view returns (bool) {
        if (!eventEnded) {
            return false;
        }

        Option storage o = options[winningOption];
        uint256 userBet = o.bets[user];
        return userBet > 0;
    }

    function getUserBet(address user) external view returns (uint256[] memory) {
        uint256[] memory bets = new uint256[](optionNames.length);
        for (uint256 i = 0; i < optionNames.length; i++) {
            bets[i] = options[i].bets[user];
        }
        return bets;
    }

    function getAllInfo()
        external
        view
        returns (
            uint256 _bettingEndTime,
            string[] memory _optionNames,
            uint256[] memory _totalBets
        )
    {
        _bettingEndTime = bettingEndTime;
        _optionNames = optionNames;

        _totalBets = new uint256[](optionNames.length);

        for (uint256 i = 0; i < optionNames.length; i++) {
            _totalBets[i] = options[i].totalBets;
        }
    }
}
