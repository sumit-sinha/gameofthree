import {Component} from "@angular/core";
import { Router } from "@angular/router";
import { NetworkRequestHelper } from "../../helpers/network/NetworkRequestHelper";
import { ApplicationDataHelper } from "../../helpers/data/ApplicationDataHelper";

@Component({
	selector: "sign-up",
	template: `
		<div class="section no-pad-bot" id="index-banner">
			<div class="container">
				<br><br>
				<h1 class="header center orange-text">Welcome Guest!!!</h1>
				<div class="row center">
					<h5 class="header col s12 light">Enter your name below to start your journey on the path to glory...</h5>
				</div>
				<div class="row">
					<div class="input-field input-game-name-container">
						<input placeholder="Name" type="text" class="validate {{ errorClass }}" autofocus (blur)="onInputEvent($event)" (keyup)="onInputEvent($event)" >
					</div>
				</div>
				<div class="row center">
					<a href="javascript:void(0);" (click)="onGetStarted($event)" class="btn-large waves-effect waves-light orange">Get Started</a>
				</div>
				<br><br>
			</div>
		</div>
	`,
	styles: [`
		.input-game-name-container {
			max-width: 300px;
			margin: 0 auto;
			width: 100%;
		}
		.input-game-name-container input {
			border: 1px solid rgba(224, 224, 224, 0.74);
			border-radius: 3px;
			padding: 10px;
			box-sizing: border-box;
			text-align: center;
		}

		.input-game-name-container input.error{
			background: #f7e0e0;
		}
	`]
})

export class SignupComponent {

	name: String;

	errorClass: String;

	constructor(private router: Router, 
				private networkHelper: NetworkRequestHelper) {}

	/**
	 * function called when get started button is clicked
	 * @param $event {Object} event information
	 */
	onGetStarted($event) {
		if (this.isValidInput()) {
			this.errorClass = null;
		} else {
			this.errorClass = "error";
			return;
		}

		this.networkHelper.request({
			url: "/game/new",
			method: "POST",
			parameters: {
				name: this.name
			},
			callback: {
				success: {
					fn: this.onNewGameCallback, 
					args: { scope: this }
				},
				error: {
					fn: this.onNewGameCallback,
					args: { scope: this }
				}
			}
		});
	}

	/**
	 * function called when blur or any key event happen on input element
	 * @param $event {Object} event information
	 */
	onInputEvent($event) {
		this.name = $event.target.value;
		if (this.isValidInput()) {
			this.errorClass = null;
		} else {
			this.errorClass = "error";
		}
	}

	/**
	 * function called when we get network response
	 * @param response {Object} response data
	 * @param args {Object}
	 */
	private onNewGameCallback(response, args) {
		let scope = args.scope,
			json = {};

		try { json = JSON.parse(response._body); } 
		catch (e) {}

		if (json.id == null) {
			alert("Oh Snap!!! It seems we have issue coonecting to game server.")
		} else {

			ApplicationDataHelper.getInstance().setData({
				key: "game", 
				data: json.game
			});

			ApplicationDataHelper.getInstance().setData({
				key: "gameId", 
				data: json.id
			});

			ApplicationDataHelper.getInstance().setData({
				key: "identifier", 
				data: json.identifier
			});

			scope.router.navigateByUrl("/game/" + json.id);
		}
	}

	/**
	 * check if name is not empty
	 * @return {Boolean} i.e. true or false
	 */
	private isValidInput() {
		return this.name != null && this.name.trim() !== "";
	}
}