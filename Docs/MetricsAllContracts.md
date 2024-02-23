[<img width="200" alt="get in touch with Consensys Diligence" src="https://user-images.githubusercontent.com/2865694/56826101-91dcf380-685b-11e9-937c-af49c2510aa0.png">](https://diligence.consensys.net)<br/>
<sup>
[[ 🌐 ](https://diligence.consensys.net) [ 📩 ](mailto:diligence@consensys.net) [ 🔥 ](https://consensys.github.io/diligence/)]
</sup><br/><br/>

# Solidity Metrics for 'CLI'

## Table of contents

- [Solidity Metrics for 'CLI'](#solidity-metrics-for-cli)
  - [Table of contents](#table-of-contents)
  - [Scope](#scope)
    - [Source Units in Scope](#source-units-in-scope)
      - [Out of Scope](#out-of-scope)
        - [Excluded Source Units](#excluded-source-units)
        - [Duplicate Source Units](#duplicate-source-units)
        - [Doppelganger Contracts](#doppelganger-contracts)
  - [Report](#report)
    - [Overview](#overview)
      - [Risk](#risk)
      - [Source Lines (sloc vs. nsloc)](#source-lines-sloc-vs-nsloc)
      - [Inline Documentation](#inline-documentation)
      - [Components](#components)
      - [Exposed Functions](#exposed-functions)
      - [StateVariables](#statevariables)
      - [Capabilities](#capabilities)
      - [Dependencies / External Imports](#dependencies--external-imports)
      - [Totals](#totals)
        - [Summary](#summary)
        - [AST Node Statistics](#ast-node-statistics)
          - [Function Calls](#function-calls)
          - [Assembly Calls](#assembly-calls)
          - [AST Total](#ast-total)
        - [Inheritance Graph](#inheritance-graph)
        - [CallGraph](#callgraph)
          - [Contract Summary](#contract-summary)

## <span id=t-scope>Scope</span>

This section lists files that are in scope for the metrics report.

- **Project:** `'CLI'`
- **Included Files:**
  - ``
- **Excluded Paths:**
  - ``
- **File Limit:** `undefined`

  - **Exclude File list Limit:** `undefined`

- **Workspace Repository:** `unknown` (`undefined`@`undefined`)

### <span id=t-source-Units-in-Scope>Source Units in Scope</span>

Source Units Analyzed: **`12`**<br>
Source Units in Scope: **`12`** (**100%**)

| Type     | File                                                          | Logic Contracts | Interfaces | Lines   | nLines  | nSLOC   | Comment Lines | Complex. Score | Capabilities                                                                         |
| -------- | ------------------------------------------------------------- | --------------- | ---------- | ------- | ------- | ------- | ------------- | -------------- | ------------------------------------------------------------------------------------ |
| 🔍       | contracts/interfaces/DividendPayingTokenInterface.sol         | \*\*\*\*        | 1          | 33      | 22      | 5       | 20            | 10             | **<abbr title='Payable Functions'>💰</abbr>**                                        |
| 🔍       | contracts/interfaces/DividendPayingTokenOptionalInterface.sol | \*\*\*\*        | 1          | 22      | 10      | 3       | 13            | 7              | \*\*\*\*                                                                             |
| 🔍       | contracts/interfaces/IUniswapDex.sol                          | \*\*\*\*        | 2          | 38      | 6       | 4       | 1             | 22             | **<abbr title='Payable Functions'>💰</abbr>**                                        |
| 📚       | contracts/libs/IterableMapping.sol                            | 1               | \*\*\*\*   | 58      | 58      | 44      | 2             | 7              | \*\*\*\*                                                                             |
| 🎨       | contracts/libs/miner/Airdrop.sol                              | 1               | \*\*\*\*   | 19      | 13      | 7       | 4             | 11             | \*\*\*\*                                                                             |
| 🎨       | contracts/libs/miner/Auth.sol                                 | 1               | \*\*\*\*   | 67      | 67      | 35      | 22            | 21             | \*\*\*\*                                                                             |
| 📝       | contracts/libs/miner/InvestorsManager.sol                     | 1               | \*\*\*\*   | 128     | 128     | 100     | 17            | 25             | \*\*\*\*                                                                             |
| 📝       | contracts/libs/miner/Timer.sol                                | 1               | \*\*\*\*   | 54      | 54      | 30      | 14            | 38             | \*\*\*\*                                                                             |
| 📝       | contracts/libs/RewardsTracker.sol                             | 1               | \*\*\*\*   | 218     | 212     | 168     | 5             | 103            | **<abbr title='Payable Functions'>💰</abbr><abbr title='TryCatch Blocks'>♻️</abbr>** |
| 📚       | contracts/libs/SafeMathInt.sol                                | 1               | \*\*\*\*   | 61      | 61      | 33      | 19            | 16             | \*\*\*\*                                                                             |
| 📚       | contracts/libs/SafeMathUint.sol                               | 1               | \*\*\*\*   | 10      | 10      | 8       | 1             | 3              | \*\*\*\*                                                                             |
| 📝       | contracts/Profit.sol                                          | 1               | \*\*\*\*   | 137     | 137     | 105     | 3             | 52             | \*\*\*\*                                                                             |
| 📝📚🔍🎨 | **Totals**                                                    | **9**           | **4**      | **845** | **778** | **542** | **121**       | **315**        | **<abbr title='Payable Functions'>💰</abbr><abbr title='TryCatch Blocks'>♻️</abbr>** |

<sub>
Legend: <a onclick="toggleVisibility('table-legend', this)">[➕]</a>
<div id="table-legend" style="display:none">

<ul>
<li> <b>Lines</b>: total lines of the source unit </li>
<li> <b>nLines</b>: normalized lines of the source unit (e.g. normalizes functions spanning multiple lines) </li>
<li> <b>nSLOC</b>: normalized source lines of code (only source-code lines; no comments, no blank lines) </li>
<li> <b>Comment Lines</b>: lines containing single or block comments </li>
<li> <b>Complexity Score</b>: a custom complexity score derived from code statements that are known to introduce code complexity (branches, loops, calls, external interfaces, ...) </li>
</ul>

</div>
</sub>

#### <span id=t-out-of-scope>Out of Scope</span>

##### <span id=t-out-of-scope-excluded-source-units>Excluded Source Units</span>

Source Units Excluded: **`0`**

<a onclick="toggleVisibility('excluded-files', this)">[➕]</a>

<div id="excluded-files" style="display:none">
| File   |
| ------ |
| None |

</div>

##### <span id=t-out-of-scope-duplicate-source-units>Duplicate Source Units</span>

Duplicate Source Units Excluded: **`0`**

<a onclick="toggleVisibility('duplicate-files', this)">[➕]</a>

<div id="duplicate-files" style="display:none">
| File   |
| ------ |
| None |

</div>

##### <span id=t-out-of-scope-doppelganger-contracts>Doppelganger Contracts</span>

Doppelganger Contracts: **`0`**

<a onclick="toggleVisibility('doppelganger-contracts', this)">[➕]</a>

<div id="doppelganger-contracts" style="display:none">
| File   | Contract | Doppelganger |
| ------ | -------- | ------------ |

</div>

## <span id=t-report>Report</span>

### Overview

The analysis finished with **`0`** errors and **`0`** duplicate files.

#### <span id=t-risk>Risk</span>

<div class="wrapper" style="max-width: 512px; margin: auto">
			<canvas id="chart-risk-summary"></canvas>
</div>

#### <span id=t-source-lines>Source Lines (sloc vs. nsloc)</span>

<div class="wrapper" style="max-width: 512px; margin: auto">
    <canvas id="chart-nsloc-total"></canvas>
</div>

#### <span id=t-inline-documentation>Inline Documentation</span>

- **Comment-to-Source Ratio:** On average there are`4.82` code lines per comment (lower=better).
- **ToDo's:** `0`

#### <span id=t-components>Components</span>

| 📝Contracts | 📚Libraries | 🔍Interfaces | 🎨Abstract |
| ----------- | ----------- | ------------ | ---------- |
| 4           | 3           | 4            | 2          |

#### <span id=t-exposed-functions>Exposed Functions</span>

This section lists functions that are explicitly declared public or payable. Please note that getter methods for public stateVars are not included.

| 🌐Public | 💰Payable |
| -------- | --------- |
| 45       | 4         |

| External | Internal | Private | Pure | View |
| -------- | -------- | ------- | ---- | ---- |
| 20       | 89       | 0       | 9    | 26   |

#### <span id=t-statevariables>StateVariables</span>

| Total | 🌐Public |
| ----- | -------- |
| 43    | 28       |

#### <span id=t-capabilities>Capabilities</span>

| Solidity Versions observed | 🧪 Experimental Features | 💰 Can Receive Funds | 🖥 Uses Assembly | 💣 Has Destroyable Contracts |
| -------------------------- | ------------------------ | -------------------- | ---------------- | ---------------------------- |
| `^0.8.19`<br/>`^0.8.22`    |                          | `yes`                | \*\*\*\*         | \*\*\*\*                     |

| 📤 Transfers ETH | ⚡ Low-Level Calls | 👥 DelegateCall | 🧮 Uses Hash Functions | 🔖 ECRecover | 🌀 New/Create/Create2 |
| ---------------- | ------------------ | --------------- | ---------------------- | ------------ | --------------------- |
| \*\*\*\*         | \*\*\*\*           | \*\*\*\*        | \*\*\*\*               | \*\*\*\*     | \*\*\*\*              |

| ♻️ TryCatch | Σ Unchecked |
| ----------- | ----------- |
| `yes`       | \*\*\*\*    |

#### <span id=t-package-imports>Dependencies / External Imports</span>

| Dependency / Import Path                        | Count |
| ----------------------------------------------- | ----- |
| @openzeppelin/contracts/access/Ownable.sol      | 1     |
| @openzeppelin/contracts/token/ERC20/ERC20.sol   | 1     |
| @openzeppelin/contracts/utils/math/SafeMath.sol | 2     |

#### <span id=t-totals>Totals</span>

##### Summary

<div class="wrapper" style="max-width: 90%; margin: auto">
    <canvas id="chart-num-bar"></canvas>
</div>

##### AST Node Statistics

###### Function Calls

<div class="wrapper" style="max-width: 90%; margin: auto">
    <canvas id="chart-num-bar-ast-funccalls"></canvas>
</div>

###### Assembly Calls

<div class="wrapper" style="max-width: 90%; margin: auto">
    <canvas id="chart-num-bar-ast-asmcalls"></canvas>
</div>

###### AST Total

<div class="wrapper" style="max-width: 90%; margin: auto">
    <canvas id="chart-num-bar-ast"></canvas>
</div>

##### Inheritance Graph

<a onclick="toggleVisibility('surya-inherit', this)">[➕]</a>

<div id="surya-inherit" style="display:none">
<div class="wrapper" style="max-width: 512px; margin: auto">
    <div id="surya-inheritance" style="text-align: center;"></div>
</div>
</div>

##### CallGraph

<a onclick="toggleVisibility('surya-call', this)">[➕]</a>

<div id="surya-call" style="display:none">
<div class="wrapper" style="max-width: 512px; margin: auto">
    <div id="surya-callgraph" style="text-align: center;"></div>
</div>
</div>

###### Contract Summary

<a onclick="toggleVisibility('surya-mdreport', this)">[➕]</a>

<div id="surya-mdreport" style="display:none">
 Sūrya's Description Report

Files Description Table

| File Name                                                     | SHA-1 Hash       |
| ------------------------------------------------------------- | ---------------- |
| contracts/interfaces/DividendPayingTokenInterface.sol         | [object Promise] |
| contracts/interfaces/DividendPayingTokenOptionalInterface.sol | [object Promise] |
| contracts/interfaces/IUniswapDex.sol                          | [object Promise] |
| contracts/libs/IterableMapping.sol                            | [object Promise] |
| contracts/libs/miner/Airdrop.sol                              | [object Promise] |
| contracts/libs/miner/Auth.sol                                 | [object Promise] |
| contracts/libs/miner/InvestorsManager.sol                     | [object Promise] |
| contracts/libs/miner/Timer.sol                                | [object Promise] |
| contracts/libs/RewardsTracker.sol                             | [object Promise] |
| contracts/libs/SafeMathInt.sol                                | [object Promise] |
| contracts/libs/SafeMathUint.sol                               | [object Promise] |
| contracts/Profit.sol                                          | [object Promise] |

Contracts Description Table

|                 Contract                 |                        Type                        |     Bases      |                |               |
| :--------------------------------------: | :------------------------------------------------: | :------------: | :------------: | :-----------: |
|                    └                     |                 **Function Name**                  | **Visibility** | **Mutability** | **Modifiers** |
|                                          |                                                    |                |                |               |
|     **DividendPayingTokenInterface**     |                     Interface                      |                |                |               |
|                    └                     |                distributeDividends                 |  External ❗️   |       💵       |     NO❗️      |
|                    └                     |                  withdrawDividend                  |  External ❗️   |       🛑       |     NO❗️      |
|                    └                     |                     dividendOf                     |  External ❗️   |                |     NO❗️      |
|                                          |                                                    |                |                |               |
| **DividendPayingTokenOptionalInterface** |                     Interface                      |                |                |               |
|                    └                     |               withdrawableDividendOf               |  External ❗️   |                |     NO❗️      |
|                    └                     |                withdrawnDividendOf                 |  External ❗️   |                |     NO❗️      |
|                    └                     |               accumulativeDividendOf               |  External ❗️   |                |     NO❗️      |
|                                          |                                                    |                |                |               |
|               **IFactory**               |                     Interface                      |                |                |               |
|                    └                     |                     createPair                     |  External ❗️   |       🛑       |     NO❗️      |
|                    └                     |                      getPair                       |  External ❗️   |                |     NO❗️      |
|                                          |                                                    |                |                |               |
|               **IRouter**                |                     Interface                      |                |                |               |
|                    └                     |                  addLiquidityETH                   |  External ❗️   |       💵       |     NO❗️      |
|                    └                     | swapExactTokensForETHSupportingFeeOnTransferTokens |  External ❗️   |       🛑       |     NO❗️      |
|                    └                     | swapExactETHForTokensSupportingFeeOnTransferTokens |  External ❗️   |       💵       |     NO❗️      |
|                    └                     |                      factory                       |  External ❗️   |                |     NO❗️      |
|                    └                     |                        wETH                        |  External ❗️   |                |     NO❗️      |
|                                          |                                                    |                |                |               |
|           **IterableMapping**            |                      Library                       |                |                |               |
|                    └                     |                      \_remove                      |  Internal 🔒   |       🛑       |               |
|                    └                     |                       \_set                        |  Internal 🔒   |       🛑       |               |
|                    └                     |                       \_get                        |  Internal 🔒   |                |               |
|                    └                     |                  \_getIndexOfKey                   |  Internal 🔒   |                |               |
|                    └                     |                  \_getKeyAtIndex                   |  Internal 🔒   |                |               |
|                    └                     |                       \_size                       |  Internal 🔒   |                |               |
|                                          |                                                    |                |                |               |
|               **Airdrop**                |                   Implementation                   |                |                |               |
|                    └                     |                   <Constructor>                    |   Public ❗️    |       🛑       |     NO❗️      |
|                    └                     |                    enableClaim                     |   Public ❗️    |       🛑       |     NO❗️      |
|                    └                     |                   claimMachines                    |   Public ❗️    |       🛑       |     NO❗️      |
|                    └                     |                  setAirdropToken                   |   Public ❗️    |       🛑       |     NO❗️      |
|                                          |                                                    |                |                |               |
|                 **Auth**                 |                   Implementation                   |                |                |               |
|                    └                     |                   <Constructor>                    |   Public ❗️    |       🛑       |     NO❗️      |
|                    └                     |                     authorize                      |   Public ❗️    |       🛑       |   onlyOwner   |
|                    └                     |                    unauthorize                     |   Public ❗️    |       🛑       |   onlyOwner   |
|                    └                     |                      isOwner                       |   Public ❗️    |                |     NO❗️      |
|                    └                     |                    isAuthorized                    |   Public ❗️    |                |     NO❗️      |
|                    └                     |                 transferOwnership                  |   Public ❗️    |       🛑       |   onlyOwner   |
|                                          |                                                    |                |                |               |
|           **InvestorsManager**           |                   Implementation                   |                |                |               |
|                    └                     |                 getNumberInvestors                 |   Public ❗️    |                |     NO❗️      |
|                    └                     |               getTotalReferralsUses                |   Public ❗️    |                |     NO❗️      |
|                    └                     |              getTotalReferralsGreens               |   Public ❗️    |                |     NO❗️      |
|                    └                     |                  getInvestorData                   |   Public ❗️    |                |     NO❗️      |
|                    └                     |                  getInvestorData                   |   Public ❗️    |                |     NO❗️      |
|                    └                     |                getInvestorMachines                 |   Public ❗️    |                |     NO❗️      |
|                    └                     |                  getReferralData                   |   Public ❗️    |                |     NO❗️      |
|                    └                     |                  getReferralUses                   |   Public ❗️    |                |     NO❗️      |
|                    └                     |                \_initializeInvestor                |  Internal 🔒   |       🛑       |               |
|                    └                     |                \_setInvestorAddress                |  Internal 🔒   |       🛑       |               |
|                    └                     |              \_addInvestorInvestment               |  Internal 🔒   |       🛑       |               |
|                    └                     |              \_addInvestorWithdrawal               |  Internal 🔒   |       🛑       |               |
|                    └                     |             \_setInvestorHiredMachines             |  Internal 🔒   |       🛑       |               |
|                    └                     |             \_setInvestorClaimedGreens             |  Internal 🔒   |       🛑       |               |
|                    └                     |           \_setInvestorGreensByReferral            |  Internal 🔒   |       🛑       |               |
|                    └                     |               \_setInvestorLastHire                |  Internal 🔒   |       🛑       |               |
|                    └                     |            \_setInvestorSellsTimestamp             |  Internal 🔒   |       🛑       |               |
|                    └                     |                \_setInvestorNsells                 |  Internal 🔒   |       🛑       |               |
|                    └                     |               \_setInvestorReferral                |  Internal 🔒   |       🛑       |               |
|                    └                     |               \_setInvestorLastSell                |  Internal 🔒   |       🛑       |               |
|                    └                     |            \_setInvestorCustomSellTaxes            |  Internal 🔒   |       🛑       |               |
|                    └                     |               \_increaseReferralUses               |  Internal 🔒   |       🛑       |               |
|                                          |                                                    |                |                |               |
|                **Timer**                 |                   Implementation                   |      Auth      |                |               |
|                    └                     |                   <Constructor>                    |   Public ❗️    |       🛑       |     Auth      |
|                    └                     |                   setCurrentTime                   |  External ❗️   |       🛑       |  authorized   |
|                    └                     |                       enable                       |  External ❗️   |       🛑       |  authorized   |
|                    └                     |                    increaseDays                    |  External ❗️   |       🛑       |  authorized   |
|                    └                     |                  increaseMinutes                   |  External ❗️   |       🛑       |  authorized   |
|                    └                     |                  increaseSeconds                   |  External ❗️   |       🛑       |  authorized   |
|                    └                     |                   getCurrentTime                   |   Public ❗️    |                |     NO❗️      |
|                                          |                                                    |                |                |               |
|            **RewardsTracker**            |                   Implementation                   |    Ownable     |                |               |
|                    └                     |                   <Constructor>                    |   Public ❗️    |       🛑       |     NO❗️      |
|                    └                     |                excludeFromDividends                |  External ❗️   |       🛑       |   onlyOwner   |
|                    └                     |                  \_setRewardToken                  |  Internal 🔒   |       🛑       |               |
|                    └                     |                     getAccount                     |   Public ❗️    |                |     NO❗️      |
|                    └                     |                     setBalance                     |  Internal 🔒   |       🛑       |               |
|                    └                     |             \_setMinBalanceForRewards              |  Internal 🔒   |       🛑       |               |
|                    └                     |                   autoDistribute                   |   Public ❗️    |       🛑       |     NO❗️      |
|                    └                     |                  \_processAccount                  |  Internal 🔒   |       🛑       |               |
|                    └                     |                distributeDividends                 |  External ❗️   |       💵       |     NO❗️      |
|                    └                     |               \_distributeDividends                |  Internal 🔒   |       🛑       |               |
|                    └                     |              \_withdrawDividendOfUser              |  Internal 🔒   |       🛑       |               |
|                    └                     |               swapEthForCustomToken                |  Internal 🔒   |       🛑       |               |
|                    └                     |                     dividendOf                     |   Public ❗️    |                |     NO❗️      |
|                    └                     |               withdrawableDividendOf               |   Public ❗️    |                |     NO❗️      |
|                    └                     |                withdrawnDividendOf                 |   Public ❗️    |                |     NO❗️      |
|                    └                     |               accumulativeDividendOf               |   Public ❗️    |                |     NO❗️      |
|                    └                     |                     addShares                      |  Internal 🔒   |       🛑       |               |
|                    └                     |                    removeShares                    |  Internal 🔒   |       🛑       |               |
|                    └                     |                    \_setBalance                    |  Internal 🔒   |       🛑       |               |
|                                          |                                                    |                |                |               |
|             **SafeMathInt**              |                      Library                       |                |                |               |
|                    └                     |                        mul                         |  Internal 🔒   |                |               |
|                    └                     |                        div                         |  Internal 🔒   |                |               |
|                    └                     |                        sub                         |  Internal 🔒   |                |               |
|                    └                     |                        add                         |  Internal 🔒   |                |               |
|                    └                     |                        abs                         |  Internal 🔒   |                |               |
|                    └                     |                   toUint256Safe                    |  Internal 🔒   |                |               |
|                                          |                                                    |                |                |               |
|             **SafeMathUint**             |                      Library                       |                |                |               |
|                    └                     |                    toInt256Safe                    |  Internal 🔒   |                |               |
|                                          |                                                    |                |                |               |
|                **Profit**                |                   Implementation                   |                |                |               |
|                    └                     |                   <Constructor>                    |   Public ❗️    |       🛑       |     NO❗️      |
|                    └                     |                  sendTransaction                   |   Public ❗️    |       🛑       |     NO❗️      |
|                    └                     |                      reinvest                      |   Public ❗️    |       🛑       |   onlyOwner   |
|                    └                     |                  \_updateUserInfo                  |  Internal 🔒   |       🛑       |               |
|                    └                     |                 \_getCurrentFarmed                 |  Internal 🔒   |                |               |

Legend

| Symbol | Meaning                   |
| :----: | ------------------------- |
|   🛑   | Function can modify state |
|   💵   | Function is payable       |

</div>
____
<sub>
Thinking about smart contract security? We can provide training, ongoing advice, and smart contract auditing. [Contact us](https://diligence.consensys.net/contact/).
</sub>
