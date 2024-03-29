// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./libs/SafeMathUint.sol";

// import "hardhat/console.sol";

contract Test {
    using SafeMath for uint256;
    using SafeMathUint for uint256;

    function reinvest(uint256 gasAvailable) public {
        uint256 size = elegibleUsers.length;
        if (size == 0) return;

        uint256 gasSpent = 0;
        uint256 gasLeft = gasleft();
        uint256 lastIndex = currentIndex;

        gasSpent += gasLeft - gasleft();
        gasLeft = gasleft();
        currentIndex = lastIndex;
    }
}
