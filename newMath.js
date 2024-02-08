const farmedByDay = 100;

let kf = 1;

let totalLP = 0;
let totalDLP = 0;

let started = false;
let startTime = 0;

let reinvestTime = 0;

let UserInfo = [];
let percents = [];

const sleep = ms => new Promise(r => setTimeout(r, ms));

// const getPercents = time => {
//   console.log('getPercents:\n', percents);
// };

const _getCurrentFarmed = time => {
  let dTime = reinvestTime == 0 ? time - startTime : time - reinvestTime;
  const currentFarmed = farmedByDay * dTime;
  console.log('_getCurrentFarmed:', currentFarmed);
  return currentFarmed;
};

const reInvest = () => {
  const time = Number((new Date().getTime() / 1000).toFixed());
  try {
    // getPercents(time);
    const currentFarmed = _getCurrentFarmed(time);
    reinvestTime = time;
    totalLP += currentFarmed;
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const updateInfo = (type, id, amountLP, time) => {
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
  if (type == 'deposit') {
    newAmountDLP += amountLP * kf;
    totalLP += amountLP;
    totalDLP += amountLP * kf;
  }
  if (type == 'withdraw') {
    newAmountDLP -= amountLP * kf;
    totalLP -= amountLP;
    totalDLP -= amountLP * kf;
  }

  UserInfo[id] = {
    amountDLP: newAmountDLP,
    amountLP: (newAmountDLP * totalLP) / totalDLP
  };

  console.log('after:', UserInfo[id]);
  console.log('global:', { totalDLP, totalLP });

  return true;
};
const sendTransaction = (type, id, amountLP) => {
  const time = Number((new Date().getTime() / 1000).toFixed());

  if (type == 'deposit') {
    if (UserInfo[id] == undefined || UserInfo[id].amountDLP <= 0) {
      UserInfo[id] = {
        amountDLP: 0
      };
    }
  }
  const user = UserInfo[id];

  console.log(type + ' user:', id);
  console.log('before:', user);

  if (type == 'withdraw') {
    if (!user || user.amountLP <= 0) return console.error('You dont using this pool');
    if (user.amountLP < amountLP) return console.error('Insufficient LP amount');
  }
  if (updateInfo(type, id, amountLP, time)) {
    //tranfer
    console.log('Done\n');
    //emit
  } else return console.error('hz tut potom uzhe dumat');
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
