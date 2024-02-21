const farmedByDay = 100;

let kf = 1;

let totalLP = 0;
let totalDLP = 0;

let started = false;
let startTime = 0;

let reinvestTime = 0;

const UserInfo = [];

const sleep = ms => new Promise(r => setTimeout(r, ms));

const _getCurrentFarmed = time => {
  const dTime = reinvestTime === 0 ? time - startTime : time - reinvestTime;
  const currentFarmed = farmedByDay * dTime;
  console.log('_getCurrentFarmed:', currentFarmed);
  return currentFarmed;
};

const reInvest = () => {
  const time = Number((new Date().getTime() / 1000).toFixed());
  try {
    const currentFarmed = _getCurrentFarmed(time);
    reinvestTime = time;
    totalLP += currentFarmed;
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const updateUserInfo = (type, id, amountLP, time) => {
  if (!started) {
    startTime = time;
    started = true;
  }

  const currentFarmed = _getCurrentFarmed(time);
  if (currentFarmed >= 200) {
    reInvest();
    kf = totalDLP / totalLP;
    console.log('kf:', kf);
  }

  let newAmountDLP = UserInfo[id].amountDLP;

  if (amountLP !== 0) {
    if (type === 'deposit') {
      newAmountDLP += amountLP * kf;
      totalLP += amountLP;
      totalDLP += amountLP * kf;
    }
    if (type === 'withdraw') {
      newAmountDLP -= amountLP * kf;
      totalLP -= amountLP;
      totalDLP -= amountLP * kf;
    }
  }

  UserInfo[id] = {
    amountDLP: newAmountDLP,
    amountLP: (newAmountDLP * totalLP) / totalDLP
  };

  console.log('User Info after update:', UserInfo[id]);
  console.log('Global Info:', { totalDLP, totalLP });
  return true;
};
const sendTransaction = (type, id, amountLP) => {
  const time = Number((new Date().getTime() / 1000).toFixed());

  if (type === 'deposit' && (!UserInfo[id] || UserInfo[id].amountDLP <= 0)) {
    UserInfo[id] = {
      amountDLP: 0,
      amountLP: 0
    };
  }

  const user = UserInfo[id];

  console.log(`${type} user: ${id}`);
  console.log('User Info before:', user);

  if (type === 'withdraw') {
    if (!user || user.amountLP <= 0) {
      return console.error('You are not using this pool');
    }
    if (user.amountLP < amountLP) {
      return console.error('Insufficient LP amount');
    }
  }
  if (updateUserInfo(type, id, amountLP, time)) {
    console.log('Transaction Done\n');
  } else {
    return console.error('Unknown transaction type');
  }
};

sendTransaction('deposit', 0, 100);
sleep(1000).then(async () => {
  sendTransaction('deposit', 1, 100);
  await sleep(1000);
  sendTransaction('deposit', 0, 100);
  await sleep(2000);
  sendTransaction('deposit', 2, 100);
  await sleep(4000);
  sendTransaction('deposit', 0, 0);
  sendTransaction('deposit', 1, 0);
  sendTransaction('deposit', 2, 0);
});
