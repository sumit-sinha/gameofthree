import {Component} from "@angular/core";

@Component({
	selector: "game-info",
	template: `
		<div class="section no-pad-bot" id="index-banner">
			<div class="container">
				<h1>Game of Three</h1>
				<h2>Goal</h2>
				<p>The Goal is to implement a game with two independent units - the players - communicating with each other using an API.</p>
				<h2>Description</h2>
				<p>When a player starts, it incepts a random (whole) number and sends it to the second player as an approach of starting the game.</p>
				<p>The receiving player can now always choose between adding one of [1, 0, 1] to get to a number that is divisible by 3. Divide it by three. The resulting whole number is then sent back to the original sender.</p> 
				<p>The same rules are applied until one player reaches the number 1 (after the division).</p>
				<img src="/images/game.png" alt="game">
			</div>
		</div>
	`,
	styles:[`
		h1 {font-size: 25px;}
		h2 {font-size: 20px;}
		img {width: 100%; margin-top: 10px;}
	`]
})

export class InformationPageComponent {

}