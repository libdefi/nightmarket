// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/NightMarket.sol";

contract NightMarketTest is Test {
    NightMarket nightMarket;

    function setUp() public {
        nightMarket = new NightMarket();
    }

    function testStartNewRound() public {
        string[] memory options = new string[](2);
        options[0] = "Option 1";
        options[1] = "Option 2";

        nightMarket.startNewRound(
            block.timestamp + 1 days,
            block.timestamp + 2 days,
            110,
            options
        );

        (
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
        ) = nightMarket.getRoundInfo(1);

        assertEq(bettingEndTime, block.timestamp + 1 days);

        uint256 optionCount = nightMarket.getOptionCount(1);
        assertEq(optionCount, 2);

        assertEq(
            keccak256(bytes(optionNames[0])),
            keccak256(bytes("Option 1"))
        );
        assertEq(
            keccak256(bytes(optionNames[1])),
            keccak256(bytes("Option 2"))
        );
    }

    function testGetOptionCount() public {
        string[] memory options = new string[](3);
        options[0] = "Option A";
        options[1] = "Option B";
        options[2] = "Option C";

        nightMarket.startNewRound(
            block.timestamp + 1 days,
            block.timestamp + 2 days,
            120,
            options
        );

        uint256 optionCount = nightMarket.getOptionCount(1);
        assertEq(optionCount, 3);
    }

    function testGetOptionNames() public {
        string[] memory options = new string[](3);
        options[0] = "Option X";
        options[1] = "Option Y";
        options[2] = "Option Z";

        nightMarket.startNewRound(
            block.timestamp + 1 days,
            block.timestamp + 2 days,
            130,
            options
        );

        string[] memory optionNames = nightMarket.getOptionNames(1);

        assertEq(optionNames.length, 3);
        assertEq(
            keccak256(bytes(optionNames[0])),
            keccak256(bytes("Option X"))
        );
        assertEq(
            keccak256(bytes(optionNames[1])),
            keccak256(bytes("Option Y"))
        );
        assertEq(
            keccak256(bytes(optionNames[2])),
            keccak256(bytes("Option Z"))
        );
    }
}
