const { ethers } = require('ethers');

// As a workaround, we have a function with the
// same name and parameters as the error in the abi.
const abi = ['function InsufficientBalance(uint256 available, uint256 required)'];

const interface = new ethers.utils.Interface(abi);
const error_data =
  '0xcf479181000000000000000000000000000000000000' +
  '0000000000000000000000000100000000000000000000' +
  '0000000000000000000000000000000000000100000000';

const decoded = interface.decodeFunctionData(
  interface.functions['InsufficientBalance(uint256,uint256)'],
  error_data
);

// Contents of decoded:
// [
//   BigNumber { _hex: '0x0100', _isBigNumber: true },
//   BigNumber { _hex: '0x0100000000', _isBigNumber: true },
//   available: BigNumber { _hex: '0x0100', _isBigNumber: true },
//   required: BigNumber { _hex: '0x0100000000', _isBigNumber: true }
// ]
console.log(
  'Insufficient balance for transfer. ' +
    `Needed ${decoded.required.toString()} but only ` +
    `${decoded.available.toString()} available.`
);
// git branch -m OLD-BRANCH-NAME NEW-BRANCH-NAME
// git fetch origin
// git branch -u origin/NEW-BRANCH-NAME NEW-BRANCH-NAME
// git remote set-head origin -a

const test = async () => {
  const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

  try {
    const tx = await tokenContract.transferTokens(amount);
    await tx.wait();
  } catch (error) {
    const reasonBytes = error.data;
    const errorSelector = ethers.utils.hexDataSlice(reasonBytes, 0, 4);

    const invalidAmountSelector = tokenContract.interface.getSighash(
      'InvalidAmount(uint256,uint256)'
    );
    const insufficientFundsSelector = tokenContract.interface.getSighash('InsufficientFunds()');

    if (errorSelector === invalidAmountSelector) {
      console.log('Invalid amount');
    } else if (errorSelector === insufficientFundsSelector) {
      console.log('Insufficient funds for the transfer');
    } else {
      console.log('Unknown error:', error);
    }
  }
};

// Insufficient balance for transfer. Needed 4294967296 but only 256 available.

// https://soliditylang.org/blog/2021/04/21/custom-errors/

// Пользовательские ошибки в Solidity могут повысить прозрачность и эффективность кода смарт-контракта,
// обеспечивая более информативную обратную связь для разработчиков и потребителей смарт-контрактов,
// например, с помощью библиотеки Web3.
// Добавление их в ваш набор инструментов будет очень полезным и снизит затраты на газ.

// На данный момент нет удобного способа отлавливать ошибки в Solidity,
// но это планируется, и прогресс можно отследить в выпуске
// https://github.com/ethereum/solidity/issues/11278
// Кроме того, require(condition, "error message") должно быть преобразовано в
// if (!condition) revert CustomError().

//////////////////////////////////////////////////////////////////////////////////////////////
// error MyCustomError();

// contract C {
//     function throwMyCustomError() external {
//         revert MyCustomError();
//     }
//     function foo() external {
//         try throwMyCustomError() {
//             // ...
//         } catch (bytes memory err) {
//             // Note: you probably want to pre calc this hash
//             if (keccak256(abi.encodeWithSignature("MyCustomError()")) == keccak256(err)) {
//                 // handle MyCustomError
//             }
//         }
//     }
// }

// function executeTransfer(address token, uint256 amount) public {
//     try tokenContract(token).transferTokens(amount) {
//         // Successful transfer
//     } catch (bytes memory reason) {
//         bytes4 errorSelector = abi.decode(reason, (bytes4));

//         // Assuming there are InvalidAmount and InsufficientFunds errors defined
//         if (errorSelector == InvalidAmount.selector) {
//             // Handle invalid amount error
//         } else if (errorSelector == InsufficientFunds.selector) {
//             // Handle insufficient funds error
//         } else {
//             // Handle other errors
//         }
//     }
// }
