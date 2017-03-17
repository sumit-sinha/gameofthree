"use strict"

/**
 * define path to create new game
 * @param app {Object} express js app Object
 * @param games {Object} a map of all available games
 */
module.exports = function(app, games) {

	/**
	 * get a new game id<br/>
	 * a maximum of 999 games are supported at once
	 * @return {Number}
	 */
	let getGameID = function() {
		let id = 1;
		while (games[id] != null) {
			
			if (games[id].players.p2.name == null) {
				break;
			}

			if (id == 999) {
				id = 1;
				break;
			}

			id++;
		}

		return id;
	};

	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	let getRandomInt = function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	app.route("/game/new")
		.post((request, response) => {
			
			let id = getGameID(),
				player = request.body.name,
				identifier = null,
				myTurn = false;

			if (player == null || player.trim() === "") {
				response.send({error: true});
			}

			if (games[id] == null) {

				let playerOneId = getRandomInt(1000,4999),
					playerTwoId = getRandomInt(5000,9999);

				games[id] = {
					turns: [{
						p1: getRandomInt(50, 100)
					}],
					currentTurn: 0,
					players: {
						p1: { name: player, id: playerOneId },
						p2: { name: null, id: playerTwoId }
					},
					nextTurn: playerTwoId
				};

				identifier = games[id].players.p1.id;
			} else {
				games[id].players.p2.name = player;

				myTurn = true;
				identifier = games[id].players.p2.id;
			}

			response.send({
				id: id,
				game: {
					myTurn: myTurn,
					turns: games[id].turns,
					players: {
						p1: games[id].players.p1.name,
						p2: games[id].players.p2.name
					}
				},
				identifier: identifier
			})
		});
}
