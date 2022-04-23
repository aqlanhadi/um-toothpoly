const rooms = require("../store")
const questions = require("../resources/questions")

module.exports = {
	makeid,
	removeFromAll,
	getRoom,
	getRoomAndIndex,
	getRandomQuestion,
	cleanupUponDisconnect,
	move
}

function getRoom(id) {
    return rooms.find(r => r.players.find(p => p._id === id))
}

function getRoomAndIndex(id) {
    let room = rooms.find(r => r.players.find(p => p._id === id))

    if (!room) return [null, null]

    let player_idx = room.players.findIndex(p => p._id === id)
    return [room, player_idx]
}

function getRandomQuestion() {
    return questions[Math.floor(Math.random() * questions.length)]
}
  
function makeid(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function removeFromAll(id) {
	let states = require("../store")

	delete states.clients[id]

	let room = states.rooms

	if (room.length === 0) return

	console.log(room)

	room.forEach((room, idx) => {
		let player_idx = room.players.findIndex(player => player.id == id)
		if (player_idx > -1) {
			room.playerCount-- // decrement player count for room
			room.players.splice(player_idx, 1) // remove player from room
		}

		if (room.playerCount == 0) states.rooms.splice(idx, 1)
	})	
}

function cleanupUponDisconnect(client, socket) {	
	console.log(`cleanupUponDisconnect from ${client.id}`)
	let rooms = require('../store')
	let [room, player_idx] = getRoomAndIndex(client.id)
	
	if (!room) {
		console.log(`cleanupUponDisconnect: no room found for ${client.id}`)
		return
	}

	room.players[player_idx].active = false

	// if no active players left
	if (room.players.length === room.players.filter(p => !p.active).length) {
		let roomIdx = rooms.findIndex(r => r.code !== room.code)
		rooms.splice(roomIdx, 1)
	} else { // if there are active players

		// give up slot
		room.availableSlots.push(room.players[player_idx].slot)

		 // change turn if it was this player's turn
		if (room.turn === player_idx) {
			room.scene = 'game'
			do {
				room.turn = (room.turn + 1) % room.players.length
			} while (room.players[room.turn].is_winner && room.players[room.turn].active === false)
		}

		if (room.scene = 'lobby') room.players.splice(player_idx, 1)

		socket.in(room.code).emit('game:data:update', room)
	}
	//console.log(room)
	
	client.leave(room.code)
}

function move(from, to, direct) {
	let leftMotionArray = []
	let bottomMotionArray = []

	if (direct) {
		let [fromX, fromY] = getRelPos(from)
		let [toX, toY] = getRelPos(to)
		leftMotionArray.push(fromX)
		leftMotionArray.push(toX)
		bottomMotionArray.push(fromY)
		bottomMotionArray.push(toY)
	} else {
		for (let i = from; i <= to; i++) {
			if (i > 100) {
				let [x, y] = getRelPos(200 - i);
				leftMotionArray.push(x);
				bottomMotionArray.push(y);
			} else {
				let [x, y] = getRelPos(i);
				leftMotionArray.push(x);
				bottomMotionArray.push(y);
			}
		}
	}

	//console.log(`${direct} ${leftMotionArray}`)

	return {
		left: leftMotionArray,
		bottom: bottomMotionArray
	}
}
  
	function getRelPos(tile) {
			tile-=1
			let ones = tile % 10;
			let tens = Math.floor(tile / 10);
		
			let x_rel = tens % 2 === 0 ? ones + 0.5 : 10 - (ones + 0.5);
			let y_rel = tens + 0.5;
		
			//if (y_rel > 10) y_rel = 9.5
		
			return [x_rel * 10 + "%", y_rel * 10 + "%"];
	}