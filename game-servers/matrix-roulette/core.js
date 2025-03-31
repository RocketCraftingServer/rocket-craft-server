function randomIntFromTo(min, max) {return Math.floor(Math.random() * (max - min + 1) + min);}

/**
 * @description Matrix Roulette Server 1.0.0
 * Backend part
 * Language: Node.js
 * Tech : server events
 * I use timer for main core loop.
 * @author Nikola Lukic 
 * @email zlatnaspirala@gmail.com
 * @website https://maximumroulette.com
 */

let matrixRouletteCore = {
	interval: 1000,
	momentOfHold: 20,
	holdOn: 3,
	lengthOfSession: 30,
	status: 'MEDITATE',
	coretimer: null,
	allNumbers: [],
	maxStackOfWinNums: 10,
	winningNumbers: [],
	currentWinNumber: 0,
	delta: 0,

	init: () => {
		for(var x = 0;x < 37;x++) {matrixRouletteCore.allNumbers.push(x)}
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
						counter: matrixRouletteCore.delta,
						previusWinNumbers: matrixRouletteCore.winningNumbers
					}
				})
			} else if(matrixRouletteCore.delta >= matrixRouletteCore.momentOfHold) {
				// console.log('----------------------MATRIX ROULETTE RESULTS----------------------')
				if(matrixRouletteCore.delta < matrixRouletteCore.momentOfHold + matrixRouletteCore.holdOn) {
					matrixRouletteCore.sendEventsToAll({
						matrixRoulette: {
							status: "RESULT",
							winNumber: 'hold',
							counter: matrixRouletteCore.delta,
							previusWinNumbers: matrixRouletteCore.winningNumbers
						}
					})

				} else if(matrixRouletteCore.delta >= matrixRouletteCore.momentOfHold + matrixRouletteCore.holdOn) {
					if(matrixRouletteCore.delta == matrixRouletteCore.momentOfHold + matrixRouletteCore.holdOn) {
						this.currentWinNumber = matrixRouletteCore.giveMeNum();
					}
					matrixRouletteCore.sendEventsToAll({
						matrixRoulette: {
							status: "RESULT",
							winNumber: this.currentWinNumber,
							counter: matrixRouletteCore.delta,
							previusWinNumbers: matrixRouletteCore.winningNumbers
						}
					})
				}

				if(matrixRouletteCore.delta > matrixRouletteCore.lengthOfSession) {
					matrixRouletteCore.delta = 0;
				}
				// console.log('RR RESULTS => ', R)
			} else {
				console.log('RR WAIT FOR RESULTS')
			}
			matrixRouletteCore.delta++;
		}, matrixRouletteCore.interval)

	},

	giveMeNum: () => {
		// var t = randomIntFromTo(0, 36)
		var t = 0;
		matrixRouletteCore.winningNumbers.push(t)
		if (matrixRouletteCore.winningNumbers.length > matrixRouletteCore.maxStackOfWinNums) {
			matrixRouletteCore.winningNumbers.pop();
		}
		return t;
	}
};

module.exports = matrixRouletteCore;