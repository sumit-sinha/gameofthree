import {Component} from "@angular/core";
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
					<button class="waves-effect waves-light btn btn-large">-1</button>
					<button class="waves-effect waves-light btn btn-large">0</button>
					<button class="waves-effect waves-light btn btn-large">+1</button>
				</div>
			</div>
		</div>
		<div class="mask" *ngIf="!data.game.myTurn"><span>Waiting for second player...</span></div>
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

	dataHelper: ApplicationDataHelper;

	constructor(private networkHelper: NetworkRequestHelper) {
		this.dataHelper = ApplicationDataHelper.getInstance();
		this.data = {
			game: this.dataHelper.getData("game"),
			gameId: this.dataHelper.getData("gameId"),
			identifier: this.dataHelper.getData("identifier")
		};

		setTimeout(() => {
			this.serverLookup(this);
		}, 5000);
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
	private onServerResponse(response, args) {
		let scope = args.scope,
			json = {};

		try { json = JSON.parse(response._body); } 
		catch (e) {}

		if (json.id != null) {
			scope.data.game = json.game;
			scope.dataHelper.setData({
				key: "game", 
				data: json.game
			});
		}

		setTimeout(() => {
			scope.serverLookup(scope);
		}, 5000);
	}
}