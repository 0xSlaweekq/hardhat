// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../libs/SafeMathUint.sol";
import "hardhat/console.sol";

contract Profit {
    using SafeMath for uint256;
    using SafeMathUint for uint256;

    struct UserInfo {
        uint256 id;
        uint256 amountLP;
        uint256 weight;
        uint256 lastTotalWeight;
        uint256 lastTotalFarmed;
        uint256 lastTotalLP;
    }

    mapping(address => UserInfo) public userInfo;
    mapping(uint256 => address) public userAddresses;

    bool public started;

    address public owner;

    uint256 public userCount;
    uint256 public startTime;
    uint256 public totalLP;
    uint256 public totalWeight;
    uint256 public totalFarmed;
    uint256 public reinvestTime;
    uint256 public lastUpdateTime;
    uint256 public farmedByDay = 100;

    event SendTransaction(uint256 typeF, UserInfo userInfo);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function sendTransaction(uint256 typeF, uint256 amountLP) public {
        // typeF 0-deposit, 1-withdraw, 2-reinvest
        address addr = msg.sender;

        uint256 time = block.timestamp;
        uint256 curAmountLP = userInfo[addr].amountLP;

        if (typeF == 0 && curAmountLP <= 0) {
            userCount++;
            userInfo[addr] = UserInfo(userCount, 0, 0, 0, 0, 0);
            userAddresses[userCount] = addr;
        }

        if (typeF == 1) {
            require(curAmountLP > 0, "You dont using this pool");
            require(curAmountLP >= amountLP, "Insufficient LP amount");
        }

        if (_updateUserInfo(typeF, addr, amountLP, time)) {
            emit SendTransaction(typeF, userInfo[addr]);
        } else {
            revert("Unknown transaction type");
        }
    }

    function reinvest() public onlyOwner returns (bool result) {
        uint256 currentFarmed = _getCurrentFarmed();
        totalFarmed += currentFarmed;
        reinvestTime = block.timestamp;

        for (uint256 i; i <= userCount; i++) {
            address addr = userAddresses[i];
            if (userInfo[addr].lastTotalFarmed != totalFarmed) {
                _updateUserInfo(2, addr, 0, reinvestTime);
            }
        }
        return true;
    }

    function _updateUserInfo(
        uint256 typeF,
        address addr,
        uint256 amountLP,
        uint256 time
    ) internal returns (bool result) {
        if (!started) {
            startTime = time;
            started = true;
        }

        uint256 dTime = time - lastUpdateTime;
        if (dTime != 0 && totalLP != 0) {
            totalWeight += dTime.div(totalLP);
        }

        UserInfo memory user = userInfo[addr];

        uint256 weight = user.weight.add(user.amountLP.mul(totalWeight.sub(user.lastTotalWeight)));

        uint256 newAmountLP = user.amountLP;

        if (amountLP != 0) {
            if (typeF == 0) {
                newAmountLP += amountLP;
                totalLP += amountLP;
            }

            if (typeF == 1) {
                newAmountLP -= amountLP;
                totalLP -= amountLP;
            }
        }

        if (totalFarmed != 0 && user.lastTotalFarmed != totalFarmed) {
            uint256 dTimeAll = time.sub(startTime);
            uint256 percent = weight.div(dTimeAll);
            uint256 availibleToClaim = percent.mul(totalFarmed.sub(user.lastTotalFarmed));
            newAmountLP += availibleToClaim;

            userInfo[addr] = UserInfo(user.id, newAmountLP, weight, totalWeight, totalFarmed, totalLP);
        }

        lastUpdateTime = time;
        return true;
    }

    function _getCurrentFarmed() internal view returns (uint256 currentFarmed) {
        uint256 time = block.timestamp;
        uint256 dTime;
        if (reinvestTime != 0) dTime = time - reinvestTime;
        else dTime = time - startTime;
        return farmedByDay * dTime;
    }
}
