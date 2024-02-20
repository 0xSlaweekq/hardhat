// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../libs/SafeMathUint.sol";
// import "hardhat/console.sol";

contract Profit {
    using SafeMath for uint256;
    using SafeMathUint for uint256;

    struct UserInfo {
        uint256 amountLP;
        uint256 weight;
        uint256 lastTotalWeight;
        uint256 lastTotalFarmed;
        uint256 lastTotalLP;
    }

    mapping(address => UserInfo) public userInfo;
    bool public started;

    address owner;

    uint256 public startTime;
    uint256 public totalLP;
    uint256 public totalWeight;
    uint256 public totalFarmed;
    uint256 public reinvestTime;
    uint256 public lastUpdateTime;
    uint256 public farmedByDay = 100;

    event SendTransaction(uint256 typeF, UserInfo userInfo);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller not owner");
        _;
    }

    function sendTransaction(uint256 typeF, uint256 amountLP) public {
        // typeF 0-deposit, 1-withdraw, 2-reinvest
        address id = msg.sender;

        uint256 time = block.timestamp;
        uint256 curAmountLP = userInfo[id].amountLP;

        if (typeF == 0 && curAmountLP <= 0) {
            userInfo[id] = UserInfo(0, 0, 0, 0, 0);
        }

        if (typeF == 1) {
            require(curAmountLP > 0, "You dont using this pool");
            require(curAmountLP >= amountLP, "Insufficient LP amount");
        }

        if (_updateUserInfo(typeF, id, amountLP, time)) {
            emit SendTransaction(typeF, userInfo[id]);
        } else {
            revert("Unknown transaction type");
        }
    }

    function _updateUserInfo(uint256 typeF, address id, uint256 amountLP, uint256 time) internal returns (bool) {
        if (!started) {
            startTime = time;
            started = true;
        }

        uint256 dTime = time - lastUpdateTime;
        if (dTime != 0 && totalLP != 0) {
            totalWeight += dTime.div(totalLP);
        }

        uint256 weight = userInfo[id].weight.add(userInfo[id].amountLP.mul(totalWeight.sub(userInfo[id].lastTotalWeight)));

        uint256 newAmountLP = userInfo[id].amountLP;

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

        if (totalFarmed != 0 && userInfo[id].lastTotalFarmed != totalFarmed) {
            uint256 dTimeAll = time.sub(startTime);
            uint256 percent = weight.div(dTimeAll);
            uint256 availibleToClaim = percent.mul(totalFarmed.sub(userInfo[id].lastTotalFarmed));
            newAmountLP += availibleToClaim;

            userInfo[id] = UserInfo(newAmountLP, weight, totalWeight, totalFarmed, totalLP);
        }

        lastUpdateTime = time;
        return true;
    }

    function _getCurrentFarmed() internal view returns (uint256) {
        uint256 time = block.timestamp;
        uint256 dTime;
        if (reinvestTime != 0) dTime = time - reinvestTime;
        else dTime = time - startTime;
        return farmedByDay * dTime;
    }

    function _getPercentForUser(address userAddr) external view returns (uint256) {
        UserInfo memory user = userInfo[userAddr];
        uint256 time = block.timestamp;
        uint256 dTimeAll = time - startTime;
        uint256 dTime = time - lastUpdateTime;
        uint256 totalWeights = totalWeight.add(dTime.div(totalLP));

        uint256 percent = user.weight.add(user.amountLP.mul(totalWeights.sub(user.lastTotalWeight))).div(dTimeAll);

        return percent;
    }

    function reinvest() external onlyOwner returns (bool) {
        uint256 currentFarmed = _getCurrentFarmed();
        totalFarmed += currentFarmed;
        reinvestTime = block.timestamp;

        // for(uint256 userId in userInfo) {
        //     if (UserInfo.hasOwnProperty(userId)) {
        //     _updateUserInfo('reinvest', userId, 0, block.timestamp);
        //     }
        // }
        return true;
    }
}
