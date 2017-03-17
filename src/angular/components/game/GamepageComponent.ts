import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {ApplicationDataHelper} from "../../helpers/data/ApplicationDataHelper";
import {NetworkRequestHelper} from "../../helpers/network/NetworkRequestHelper";

@Component({
	selector: "game",
	template: `
		<div class="section no-pad-bot" id="index-banner">
			<div class="container">
				<div class="players">
					<div class="player-one">{{ data.game.players.p1 }}</div>
					<div class="player-two">{{ data.game.players.p2 || 'waiting' }}</div>
				</div>
				<div class="turn-wrapper" *ngFor="let turn of data.game.turns;let i = index">
					<div *ngIf="i > 0" class="vertical-separator"></div>
					<div class="full-turn">
						<div class="player-entry yellow">{{ turn.p1 }}</div>
						<div class="horizontal-separator"></div>
						<div class="player-entry blue">{{ turn.p2 }}</div>
					</div>
				</div>
				<div class="btn-container">
					<button class="waves-effect waves-light btn btn-large" (click)="onContinue($event, -1)">-1</button>
					<button class="waves-effect waves-light btn btn-large" (click)="onContinue($event, 0)">0</button>
					<button class="waves-effect waves-light btn btn-large" (click)="onContinue($event, 1)">+1</button>
				</div>
			</div>
		</div>
		<div class="mask {{ loadingClass }}" *ngIf="!data.game.myTurn">
			<span>{{ loadingMessage }}</span>
			<span *ngIf="loadingClass">Click <a href="javascript:void(0)" (click)="onRestartClick($event)">here</a> to restart the game.</span>
		</div>
	`
	styles: [`
		.player-entry {
			border: 1px solid;
			width: 50px;
			text-align: center;
			height: 50px;
			border-radius: 25px;
			padding-top: 14px;
			display: inline-block;
		}
		.players {
			height: 55px;
		}
		.players div {
			width: 50%;
			font-size: 15px;
			font-weight: bold;
		}
		.player-one {
			float: left;
			text-align: left;
			padding-left: 8px;
		}
		.player-two {
			float: right;
			text-align: right;
			padding-right: 5px;
		}
		.player-entry.yellow {
			border-color: #ffeb3b !important;
			float: left;
		}
		.player-entry.blue {
			border-color: #2196F3 !important;
			float: right;
			color: white;
		}
		.horizontal-separator {
			display: inline-block;
			width: 50%;
			border-bottom: 1px solid;
			margin-top: 25px;
		}
		.vertical-separator {
			width: 50%;
			display: inline-block;
			border-bottom: 1px solid;
			-ms-transform: rotate(170deg);
			-webkit-transform: rotate(170deg);
			-mozkit-transform: rotate(170deg);
			transform: rotate(170deg);
			margin-top: 50px;
			margin-bottom: 25px;
		}
		.container {
			text-align: center;
		}
		.mask {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: rgba(90, 90, 90, 0.47);
			color: white;
			text-align: center;
			padding-top: 250px;
			background-image: url('/images/loading.gif');
			background-position: center;
			background-repeat: no-repeat;
			background-size: 40px;
			font-size: 16px;
			z-index: 10;
		}
		.mask.no-image {
			background-image: none;
			background: rgba(53, 53, 53, 0.78);
		}
		.btn-container {
			position: absolute;
			bottom: 23px;
			left: 0;
			right: 0;
		}
		.btn-container button {
			font-size: 16px;
		}
	`]
})

export class GamepageComponent {

	data: Object;

	loadingClass: String;

	loadingMessage: String;

	dataHelper: ApplicationDataHelper;

	constructor(private router: Router,
				private networkHelper: NetworkRequestHelper) {
		
		this.dataHelper = ApplicationDataHelper.getInstance();
		this.loadingMessage = "Waiting for second player...";
		this.loadingClass = null;

		this.data = {
			game: this.dataHelper.getData("game"),
			gameId: this.dataHelper.getData("gameId"),
			identifier: this.dataHelper.getData("identifier")
		};

		if (!this.data.game.finished) {
			setTimeout(() => {
				this.serverLookup(this);
			}, 5000);
		}
	}

	/**
	 * function called when restart link is clicked
	 * @param $event {Object} event information
	 */
	onRestartClick($event) {
		this.router.navigateByUrl("/");
	}

	/**
	 * function called when buttons are clicked
	 * @param $event {Object} event information
	 * @param number {Number} number to add 
	 */
	onContinue($event, number) {

		let turnLength = this.data.game.turns.length,
			turn = this.data.game.turns[turnLength - 1];

		let newNumber = number;
		if (turn.p2 != null) {
			newNumber += turn.p2;
		} else if (turn.p1 != null) {
			newNumber += turn.p1;
		}

		if (newNumber % 3 !== 0) {
			alert("Sorry the final number should be divisble by 3!!!");
			return;
		} else {
			newNumber = newNumber/3;
		}

		this.data.game.myTurn = false;
		this.networkHelper.request({
			url: "/game/" + this.data.gameId + "/play",
			method: "POST",
			parameters: {
				value: newNumber,
				identifier: this.data.identifier
			},
			callback: {
				success: {
					fn: this.onGameResponse, 
					args: { scope: this }
				},
				error: {
					fn: this.onGameResponse,
					args: { scope: this }
				}
			}
		});

		
		if (turn.p2 == null) {
			turn.p2 = newNumber;
		} else {
			this.data.game.turns.push({
				p1: newNumber;
			})
		}
	}

	private serverLookup(scope) {
		scope.networkHelper.request({
			url: "/game/" + scope.data.gameId,
			method: "POST",
			parameters: {
				identifier: scope.data.identifier
			},
			callback: {
				success: {
					fn: this.onServerResponse, 
					args: { scope: this }
				},
				error: {
					fn: this.onServerResponse,
					args: { scope: this }
				}
			}
		});
	}

	/**
	 * function called when we get network response
	 * @param response {Object} response data
	 * @param args {Object}
	 */
	private onGameResponse(response, args) {
		let scope = args.scope,
			json = {};

		try { json = JSON.parse(response._body); } 
		catch (e) {}

		if (json.error) {
			alert("Oh Snap!!! It seems we are not able to connect to game server.");
		} else if (json.winner) {
			alert("Hurray!!! Congratulation you are the winner");

			scope.winner = true;
			scope.loadingClass = "no-image";
			scope.loadingMessage = "Hurray!!! Congratulation you are the winner";
		}
	}

	/**
	 * function called when we get network response
	 * @param response {Object} response data
	 * @param args {Object}
	 */
	private onServerResponse(response, args) {
		let scope = args.scope,
			json = {},
			finished = false;

		try { json = JSON.parse(response._body); } 
		catch (e) {}

		if (json.id != null) {
			scope.data.game = json.game;
			scope.dataHelper.setData({
				key: "game", 
				data: json.game
			});

			if (json.game.finished) {
				finished = true;
				scope.data.game.myTurn = false;

				if (!scope.winner) {
					scope.loadingClass = "no-image";
					scope.loadingMessage = "Game Over!!! You lose.";
				}
			}
		}

		if (!finished) {
			setTimeout(() => {
				scope.serverLookup(scope);
			}, 5000);
		}
	}
}