// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract NightMarket is Ownable {
    struct Option {
        uint256 totalBets;
        mapping(address => uint256) bets;
    }

    struct Round {
        uint256 bettingEndTime;
        uint256 resultDeclareTime;
        uint256 totalPool;
        uint256 returnRate;
        bool eventEnded;
        uint256 winningOption;
        string[] optionNames;
        mapping(uint256 => Option) options;
        address creator;
    }

    uint256 public currentRoundId;
    mapping(uint256 => Round) public rounds;

    event BetPlaced(
        address indexed bettor,
        uint256 indexed round,
        uint256 indexed option,
        uint256 amount
    );
    event ResultDeclared(uint256 indexed round, uint256 indexed winningOption);

    constructor() Ownable(msg.sender) {}

    modifier beforeBettingEnd(uint256 roundId) {
        require(
            block.timestamp < rounds[roundId].bettingEndTime,
            "Betting period has ended"
        );
        _;
    }

    modifier afterBettingEnd(uint256 roundId) {
        require(
            block.timestamp >= rounds[roundId].bettingEndTime,
            "Betting period has not ended yet"
        );
        _;
    }

    modifier beforeResultDeclare(uint256 roundId) {
        require(
            block.timestamp < rounds[roundId].resultDeclareTime,
            "Result declare period has ended"
        );
        _;
    }

    modifier afterResultDeclare(uint256 roundId) {
        require(
            block.timestamp >= rounds[roundId].resultDeclareTime,
            "Result declare period has not ended yet"
        );
        _;
    }

    modifier onlyCreatorOrOwner(uint256 roundId) {
        require(
            msg.sender == rounds[roundId].creator || msg.sender == owner(),
            "Only the creator or owner can call this function"
        );
        _;
    }

    function startNewRound(
        uint256 _bettingEndTime,
        uint256 _resultDeclareTime,
        uint256 _returnRate,
        string[] calldata _optionNames
    ) external {
        require(
            _bettingEndTime < _resultDeclareTime,
            "Betting end time should be before result declare time"
        );
        require(
            _optionNames.length > 0,
            "At least one option must be provided"
        );

        currentRoundId++;
        Round storage newRound = rounds[currentRoundId];
        newRound.bettingEndTime = _bettingEndTime;
        newRound.resultDeclareTime = _resultDeclareTime;
        newRound.returnRate = _returnRate;
        newRound.eventEnded = false;

        for (uint256 i = 0; i < _optionNames.length; i++) {
            newRound.optionNames.push(_optionNames[i]);
        }

        newRound.creator = msg.sender;
    }

    function placeBet(
        uint256 roundId,
        uint256 option
    ) external payable beforeBettingEnd(roundId) {
        require(msg.value >= 0.01 ether, "Minimum bet is 0.01 ETH");
        require(
            msg.value % 0.01 ether == 0,
            "Bet amount must be in increments of 0.01 ETH"
        );
        require(option < rounds[roundId].optionNames.length, "Invalid option");

        Round storage round = rounds[roundId];
        Option storage o = round.options[option];
        o.bets[msg.sender] += msg.value;
        o.totalBets += msg.value;
        round.totalPool += msg.value;

        emit BetPlaced(msg.sender, roundId, option, msg.value);
    }

    function declareResult(
        uint256 roundId,
        uint256 _winningOption
    )
        external
        onlyCreatorOrOwner(roundId)
        afterBettingEnd(roundId)
        beforeResultDeclare(roundId)
    {
        Round storage round = rounds[roundId];
        require(_winningOption < round.optionNames.length, "Invalid option");
        round.winningOption = _winningOption;
        round.eventEnded = true;
        emit ResultDeclared(roundId, _winningOption);
    }

    function claimReward(uint256 roundId) external afterResultDeclare(roundId) {
        Round storage round = rounds[roundId];
        require(round.eventEnded, "Event has not ended yet");

        Option storage o = round.options[round.winningOption];
        uint256 userBet = o.bets[msg.sender];
        require(userBet > 0, "No winning bet found");

        uint256 reward = (round.totalPool * userBet) / o.totalBets;
        o.bets[msg.sender] = 0;

        payable(msg.sender).transfer(reward);
    }

    function getOptionTotalBets(
        uint256 roundId,
        uint256 option
    ) external view returns (uint256) {
        return rounds[roundId].options[option].totalBets;
    }

    function getUserBet(
        uint256 roundId,
        uint256 option,
        address user
    ) external view returns (uint256) {
        return rounds[roundId].options[option].bets[user];
    }

    function getOptionNames(
        uint256 roundId
    ) external view returns (string[] memory) {
        return rounds[roundId].optionNames;
    }

    function getRoundCreator(uint256 roundId) external view returns (address) {
        return rounds[roundId].creator;
    }

    function getRoundInfo(
        uint256 roundId
    )
        external
        view
        returns (
            uint256 bettingEndTime,
            uint256 resultDeclareTime,
            uint256 totalPool,
            uint256 returnRate,
            bool eventEnded,
            uint256 winningOption,
            string[] memory optionNames,
            address creator,
            uint256[] memory totalBets,
            uint256[] memory odds
        )
    {
        Round storage round = rounds[roundId];
        bettingEndTime = round.bettingEndTime;
        resultDeclareTime = round.resultDeclareTime;
        totalPool = round.totalPool;
        returnRate = round.returnRate;
        eventEnded = round.eventEnded;
        winningOption = round.winningOption;
        optionNames = round.optionNames;
        creator = round.creator;

        uint256 optionCount = round.optionNames.length;
        totalBets = new uint256[](optionCount);
        odds = new uint256[](optionCount);
        for (uint256 i = 0; i < optionCount; i++) {
            totalBets[i] = round.options[i].totalBets;
            odds[i] =
                (round.totalPool * 100) /
                (
                    round.options[i].totalBets == 0
                        ? 1
                        : round.options[i].totalBets
                ); // Avoid division by zero
        }
    }

    function canClaimReward(
        uint256 roundId,
        address user
    ) external view returns (bool) {
        Round storage round = rounds[roundId];
        if (!round.eventEnded) {
            return false;
        }

        Option storage o = round.options[round.winningOption];
        uint256 userBet = o.bets[user];
        return userBet > 0;
    }
}
