// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/NightMarket.sol";

contract NightMarketScript is Script {
    function run() external {
        vm.startBroadcast();

        NightMarket nightMarket = new NightMarket();

        vm.stopBroadcast();
    }
}
