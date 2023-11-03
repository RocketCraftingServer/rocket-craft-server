
function randomIntFromTo(min, max) {return Math.floor(Math.random() * (max - min + 1) + min);}

// THIS IS BACKEND NODEJS 
export var RRoulette = {
  interval: 1000,
  status: 'MEDITATE',
  coretimer: null,
  allNumbers: [],
  winningNumbers: [],
  delta: 0,

  init: () => {
    for(var x = 0;x < 37;x++) {
      RRoulette.allNumbers.push(x)
    }
    RRoulette.start()
  },
  start: () => {
    RRoulette.coretimer = setInterval(() => {
      if(RRoulette.delta < 20) {
        console.log('----------------------MATRIX ROULETTE MEDITATE----------------------')
      } else if(RRoulette.delta == 20) {

        console.log('----------------------MATRIX ROULETTE RESULTS----------------------')
        var R = RRoulette.giveMeNum();
        console.log('RR RESULTS => ', R)
        RRoulette.delta = 0;
      } else {
        console.log('RR WAIT FOR RESULTS')
      }
      RRoulette.delta++;
    }, RRoulette.interval)

  },
  giveMeNum: () => {
    var t = randomIntFromTo(0, 36)
    return t;
    // if(RRoulette.allNumbers.indexOf(t) != -1) {
    //   console.log('NUMB EXIST IN STACK', t)
    //   RRoulette.allNumbers.slice(RRoulette.allNumbers.indexOf(t), 1)
    //   console.log('NUMB EXIST IN STACK RRoulette.allNumbers ', RRoulette.allNumbers)
    // }
  }
};

RRoulette.init();
