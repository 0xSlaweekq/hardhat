// npm i -g solidity-metrics solidity-code-metrics // global
// npm i --save-dev solidity-metrics solidity-code-metrics // in repo
const { SolidityMetricsContainer } = require('solidity-metrics');

let options = {
  basePath: '../contracts',
  inputFileGlobExclusions: undefined,
  inputFileGlob: undefined,
  inputFileGlobLimit: undefined,
  debug: false,
  repoInfo: {
    branch: undefined,
    commit: undefined,
    remote: undefined
  }
};

let metrics = new SolidityMetricsContainer('metricsContainerName', options);

// analyze files
metrics.analyze('./contracts/Constants.sol');

// output
// metrics.generateReportMarkdown().then(text => console.log(text));
// or let text = await metrics.generateReportMarkdown();
console.log(metrics.totals());
(async () => console.log(await metrics.generateReportMarkdown()))();
