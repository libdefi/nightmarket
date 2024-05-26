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
    uint256 public returnRate;
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

    constructor(
        uint256 _bettingEndTime,
        uint256 _resultDeclareTime,
        uint256 _returnRate,
        string[] memory _optionNames
    ) Ownable(msg.sender) {
        require(
            _bettingEndTime < _resultDeclareTime,
            "Betting end time should be before result declare time"
        );
        require(
            _optionNames.length > 0,
            "At least one option must be provided"
        );
        require(
            _returnRate >= 95,
            "Return rate should be at least 95"
        );

        bettingEndTime = _bettingEndTime;
        resultDeclareTime = _resultDeclareTime;
        returnRate = _returnRate;
        eventEnded = false;
        creator = msg.sender;

        // Initialize optionNames array
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

    modifier beforeResultDeclare() {
        require(
            block.timestamp < resultDeclareTime,
            "Result declare period has ended"
        );
        _;
    }

    modifier afterResultDeclare() {
        require(
            block.timestamp >= resultDeclareTime,
            "Result declare period has not ended yet"
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
        require(msg.value >= 0.01 ether, "Minimum bet is 0.01 ETH");
        require(
            msg.value % 0.01 ether == 0,
            "Bet amount must be in increments of 0.01 ETH"
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
    ) external onlyCreatorOrOwner afterBettingEnd beforeResultDeclare {
        require(_winningOption < optionNames.length, "Invalid option");
        winningOption = _winningOption;
        eventEnded = true;
        emit ResultDeclared(_winningOption);
    }

    function claimReward() external {
        require(eventEnded, "Event has not ended yet");
        require(block.timestamp >= resultDeclareTime, "Result declare period has not ended yet");

        Option storage o = options[winningOption];
        uint256 userBet = o.bets[msg.sender];
        require(userBet > 0, "No winning bet found");

 
