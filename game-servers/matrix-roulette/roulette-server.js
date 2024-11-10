
function randomIntFromTo(min, max) {return Math.floor(Math.random() * (max - min + 1) + min);}

// BE
let matrixRouletteCore = {
	interval: 1000,
	status: 'MEDITATE',
	coretimer: null,
	allNumbers: [],
	winningNumbers: [],
	delta: 0,

	init: () => {
		for(var x = 0;x < 37;x++) {
			matrixRouletteCore.allNumbers.push(x)
		}
		matrixRouletteCore.start()
	},

	sendEventsToAll(newFact) {
		matrixRouletteCore.clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
	},

	start: () => {
		matrixRouletteCore.coretimer = setInterval(() => {
			if(matrixRouletteCore.delta < 20) {
				// console.log('----------------------MATRIX ROULETTE MEDITATE----------------------')
				matrixRouletteCore.sendEventsToAll({
					matrixRoulette: {
						status: "MEDITATE",
						counter: matrixRouletteCore.delta
					}
				})
			} else if(matrixRouletteCore.delta == 20) {
				// console.log('----------------------MATRIX ROULETTE RESULTS----------------------')
				var R = matrixRouletteCore.giveMeNum();
				matrixRouletteCore.delta = 0;
				// console.log('RR RESULTS => ', R)
				matrixRouletteCore.sendEventsToAll({
					matrixRoulette: {
						status: "RESULT",
						winNumber: R,
						counter: matrixRouletteCore.delta
					}
				})
			} else {
				console.log('RR WAIT FOR RESULTS')
			}
			matrixRouletteCore.delta++;
		}, matrixRouletteCore.interval)

	},
	giveMeNum: () => {
		var t = randomIntFromTo(0, 36)
		return t;
		// if(matrixRouletteCore.allNumbers.indexOf(t) != -1) {
		//   console.log('NUMB EXIST IN STACK', t)
		//   matrixRouletteCore.allNumbers.slice(matrixRouletteCore.allNumbers.indexOf(t), 1)
		//   console.log('NUMB EXIST IN STACK matrixRouletteCore.allNumbers ', matrixRouletteCore.allNumbers)
		// }
	}
};

module.exports = matrixRouletteCore;