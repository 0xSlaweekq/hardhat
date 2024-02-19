const farmedByDay = 100;

let totalLP = 0;
let totalFarmed = 0;

let UserInfo = [];

let started = false;
let startTime = 0;

const sleep = ms => new Promise(r => setTimeout(r, ms));

const calculateUserRewards = (id, time) => {
  if (!started) {
    startTime = time;
    started = true;
  }
  if (!UserInfo[id] || UserInfo[id].amountLP <= 0) {
    return console.error('User is not using this pool');
  }

  const elapsedTime = time - UserInfo[id].lastUpdateTime;

  // Рассчитываем доходность за прошедшее время
  const earnedSinceLastUpdate = UserInfo[id].amountLP * farmedByDay * elapsedTime;
  // Обновляем информацию о пользователе
  UserInfo[id].lastTotalFarmed += earnedSinceLastUpdate;
  UserInfo[id].lastUpdateTime = time;

  const rewards = {
    deposited: UserInfo[id].amountLP,
    earned: UserInfo[id].lastTotalFarmed
  };

  console.log('User Rewards:', rewards);
  return rewards;
};

const sendTransaction = (type, id, amountLP) => {
  const time = Number((new Date().getTime() / 1000).toFixed());

  if (type === 'deposit') {
    if (!UserInfo[id]) {
      UserInfo[id] = {
        amountLP: 0,
        lastTotalFarmed: 0,
        lastUpdateTime: time
      };
    }
    UserInfo[id].amountLP += amountLP;
    totalLP += amountLP;
  } else if (type === 'withdraw') {
    if (!UserInfo[id] || UserInfo[id].amountLP < amountLP) {
      return console.error('Invalid withdrawal');
    }
    UserInfo[id].amountLP -= amountLP;
    totalLP -= amountLP;
  }

  // Вызываем функцию для расчета наград пользователя
  calculateUserRewards(id, time);
};

const reInvest = () => {
  const time = Number((new Date().getTime() / 1000).toFixed());
  const elapsedTime = time - startTime;
  const earnedSinceLastUpdate = farmedByDay * elapsedTime;

  totalFarmed += earnedSinceLastUpdate;
  startTime = time;

  return true;
};

// Пример использования
sendTransaction('deposit', 0, 100);
sleep(2000).then(async () => {
  reInvest();
  sendTransaction('deposit', 0, 0);
  await sleep(3000);
  reInvest();
  sendTransaction('deposit', 0, 0);
});
