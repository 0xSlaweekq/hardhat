const farmedByDay = 100;

let totalLP = 0;
let totalWeight = 0;
let totalFarmed = 0;

let started = false;
let startTime = 0;

let reinvestTime = 0;
let lastUpdateTime = 0;

let UserInfo = [];
let percents = [];

const sleep = ms => new Promise(r => setTimeout(r, ms));

const updateInfo = (type, id, amountLP, time) => {
  if (!started) {
    startTime = time;
    started = true;
  }
  const dTime = time - lastUpdateTime;
  if (dTime !== 0 && totalLP !== 0) totalWeight += dTime / totalLP;
  const weight =
    UserInfo[id].weight + UserInfo[id].amountLP * (totalWeight - UserInfo[id].lastTotalWeight);

  let newAmountLP = UserInfo[id].amountLP;
  if (type === 'deposit') {
    newAmountLP += amountLP;
    totalLP += amountLP;
  }
  if (type === 'withdraw') {
    newAmountLP -= amountLP;
    totalLP -= amountLP;
  }
  if (totalFarmed !== 0 && UserInfo[id].lastTotalFarmed !== totalFarmed) {
    const dTimeAll = time - startTime;
    const percent = weight / dTimeAll;
    const availibleToClaim = percent * (totalFarmed - UserInfo[id].lastTotalFarmed);

    newAmountLP += availibleToClaim;
    totalLP += availibleToClaim;
  }
  UserInfo[id] = {
    amountLP: newAmountLP,
    weight,
    lastTotalWeight: totalWeight,
    lastTotalFarmed: totalFarmed,
    lastTotalLP: totalLP
    // lastUpdateTime
  };

  lastUpdateTime = time;
  console.log('after:', UserInfo[id]);
  console.log('global:', { totalLP, totalWeight });
  return true;
};

const sendTransaction = (type, id, amountLP) => {
  const time = Number((new Date().getTime() / 1000).toFixed());

  if (type === 'deposit') {
    if (UserInfo[id] === undefined || UserInfo[id].amountLP <= 0) {
      UserInfo[id] = {
        amountLP: 0,
        weight: 0,
        lastTotalWeight: 0,
        lastTotalFarmed: 0,
        lastTotalLP: 0
      };
    }
  }
  const user = UserInfo[id];

  console.log(type + ' user:', id);
  console.log('before:', user);

  if (type === 'withdraw') {
    if (!user || user.amountLP <= 0) return console.error('You dont using this pool');
    if (user.amountLP < amountLP) return console.error('Insufficient LP amount');
  }
  if (updateInfo(type, id, amountLP, time)) console.log('Done\n');
  else return console.error('hz tut potom uzhe dumat');
};

// const getPercents = time => {
//   const dTimeAll = time - startTime;
//   const dTime = time - lastUpdateTime;
//   let totalWeights = totalWeight + dTime / totalLP;

//   for (let a = 0; a < UserInfo.length; a++) {
//     const weight =
//       UserInfo[a].weight + UserInfo[a].amountLP * (totalWeights - UserInfo[a].lastTotalWeight);
//     percents[a] = weight / dTimeAll;
//   }
//   console.log('getPercents:\n', percents);
// };

const _getCurrentFarmed = time => {
  let dTime = reinvestTime === 0 ? time - startTime : time - reinvestTime;
  const currentFarmed = farmedByDay * dTime;
  console.log('_getCurrentFarmed:\n', currentFarmed);
  return currentFarmed;
};

const reInvest = () => {
  const time = Number((new Date().getTime() / 1000).toFixed());
  // getPercents(time);
  const currentFarmed = _getCurrentFarmed(time);

  totalFarmed += currentFarmed;
  reinvestTime = time;

  return true;
};

sendTransaction('deposit', 0, 20);
sleep(1000).then(async () => {
  sendTransaction('deposit', 2, 100);
  await sleep(2000);
  sendTransaction('deposit', 1, 20);
  await sleep(3000);
  sendTransaction('withdraw', 0, 8);
  await sleep(2000);
  sendTransaction('withdraw', 0, 7);
  await sleep(1000);
  reInvest();
  sendTransaction('deposit', 1, 0);
  await sleep(5000);
  sendTransaction('deposit', 0, 0);
  await sleep(2000);
  reInvest();
  sendTransaction('deposit', 1, 0);
  await sleep(3000);
  sendTransaction('deposit', 0, 0);
  await sleep(1000);
  sendTransaction('deposit', 2, 0);
  await sleep(1000);
  reInvest();
  sendTransaction('deposit', 0, 0);
  sendTransaction('deposit', 1, 0);
  sendTransaction('deposit', 2, 0);
});
