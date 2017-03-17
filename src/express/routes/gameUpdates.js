"use strict"

/**
 * get update of current game using game id
 * @param app {Object} express js app Object
 * @param games {Object} a map of all available games
 */
module.exports = function(app, games) {
	
	/**
	 * function to get response data
	 * @param request {Object} http request object
	 * @return {Object}
	 */
	let getResponseData = function(request) {
		let game = games[request.params.id],
			identifier = request.body.identifier || request.query.identifier,
			identifierInt = parseInt(identifier);

		if (game == null) {
			return null;
		} else if (identifier == null || (game.players.p1.id !== identifierInt 
			&& game.players.p2.id !== identifierInt)) {
			return null;
		}

		return {
			id: request.params.id,
			game: {
				myTurn: identifierInt === game.nextTurn,
				turns: game.turns,
				players: {
					p1: game.players.p1.name,
					p2: game.players.p2.name
				}
			},
			identifier: identifierInt
		};
	}

	app.route("/game/:id")
		.get((request, response) => {

			let data = getResponseData(request);
			if (data == null) {
				response.redirect("/");
				return;
			}

			response.render("index", data);
		})
		.post((request, response) => {
			let data = getResponseData(request);
			if (data == null) {
				response.send({error: true});
				return;
			}

			response.send(data);
		});
}
