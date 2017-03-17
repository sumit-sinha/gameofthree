"use strict"

const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	path = require("path")

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + "/../../static")));

app.set('view engine', 'pug');
app.listen(3000, () => {
	console.log("running server on port " + 3000);
	console.log("access content using URL: http://127.0.0.1:" + 3000 + "/");
});

app.route("/")
	.get((request, response) => {
		response.render("index", {});
	});
app.route("/info")
	.get((request, response) => {
		response.render("index", {});
	});

let games = {};
require("./routes/newGame")(app, games);
require("./routes/gameUpdates")(app, games);
require("./routes/gamePlay")(app, games);
	