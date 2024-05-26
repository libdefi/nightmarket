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
        (uint256 bettingEndTime, , , , , , , , , ) = nightMarket.getRoundInfo(
            1
        );

        assertEq(bettingEndTime, block.timestamp + 1 days);
    }
}
