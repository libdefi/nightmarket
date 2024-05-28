// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/NightMarket.sol";

contract NightMarketTest is Test {
    NightMarket nightMarket;

    function setUp() public {
        string[] memory options = new string[](2);
        options[0] = "Option 1";
        options[1] = "Option 2";

        // Set the betting end time to 1 minute from now for testing
        nightMarket = new NightMarket(block.timestamp + 1 minutes, options);
    }

    function testPlaceBet() public {
        // Ensure we are within the betting period
        vm.warp(block.timestamp + 30 seconds);

        // Place a bet of 0.003 ETH on option 0
        nightMarket.placeBet{value: 0.003 ether}(0);

        // Check that the bet was placed correctly
        uint256[] memory bets = nightMarket.getUserBet(address(this));
        assertEq(bets[0], 0.003 ether);
    }

    function testDeclareResult() public {
        // Place a bet to have some data
        vm.warp(block.timestamp + 30 seconds);
        nightMarket.placeBet{value: 0.003 ether}(0);

        // Warp to after betting period
        vm.warp(block.timestamp + 2 minutes);

        // Declare the result
        nightMarket.declareResult(0);

        // Check that the result was declared
        assertEq(nightMarket.winningOption(), 0);
        assertEq(nightMarket.eventEnded(), true);
    }

    function testClaimReward() public {
        // Place a bet
        vm.warp(block.timestamp + 30 seconds);
        nightMarket.placeBet{value: 0.003 ether}(0);

        // Declare the result
        vm.warp(block.timestamp + 2 minutes);
        nightMarket.declareResult(0);

        // Claim the reward
        vm.warp(block.timestamp + 3 minutes);
        uint256 initialBalance = address(this).balance;
        nightMarket.claimReward();
        uint256 finalBalance = address(this).balance;

        // Check that the reward was claimed
        assert(finalBalance > initialBalance);
    }

    function testWithdrawOwner() public {
        // Place a bet
        vm.warp(block.timestamp + 30 seconds);
        nightMarket.placeBet{value: 0.003 ether}(0);

        // Declare the result
        vm.warp(block.timestamp + 2 minutes);
        nightMarket.declareResult(0);

        // Warp to 21 days after betting end time
        vm.warp(block.timestamp + 21 days);

        // Withdraw remaining balance
        uint256 initialBalance = address(this).balance;
        nightMarket.withdrawOwner();
        uint256 finalBalance = address(this).balance;

        // Check that the remaining balance was withdrawn
        assert(finalBalance > initialBalance);
    }

    receive() external payable {}
}
