"use strict"

/**
 * get update of current game using game id
 * @param app {Object} express js app Object
 * @param games {Object} a map of all available games
 */
module.exports = function(app, games) {

	/**
	 * function to validate if identifier is valid
	 * @param game {Object}
	 * @param identifier {Object}
	 * @return Boolean
	 */
	let isValidIdentifier = function(game, identifier) {
		return identifier != null && (game.players.p1.id === identifier 
			|| game.players.p2.id === identifier) && game.nextTurn === identifier;
	};

	app.route("/game/:id/play")
		.post((request, response) => {

			let game = games[request.params.id],
				identifier = request.body.identifier || request.query.identifier,
				identifierInt = parseInt(identifier),
				value = parseInt(request.body.value);

			if (game == null || game.finished || !isValidIdentifier(game, identifierInt)) {
				response.send({error: true});
			}

			let turn = game.turns[game.currentTurn];
			if (turn.p1 != null && turn.p2 != null) {
				game.currentTurn += 1;
				
				turn = {};
				game.turns[game.currentTurn] = turn;
			}

			if (turn.p1 == null) {
				turn.p1 = value;
				game.nextTurn = game.players.p2.id;
			} else if (turn.p2 == null) {
				turn.p2 = value;
				game.nextTurn = game.players.p1.id;
			}

			let isWinner = value === 1;
			if (isWinner) {
				game.finished = true;
			}

			response.send({winner: isWinner});
		});
}
