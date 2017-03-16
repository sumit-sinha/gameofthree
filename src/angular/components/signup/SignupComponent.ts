import {Component} from "@angular/core";

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
						<input placeholder="Name" type="text" class="validate" autofocus>
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

		.input-game-name-container input:focus {
			border-bottom: 1px solid #e4b77e;
    		box-shadow: 0 1px 0 0 #e4b77e;
		}
	`]
})

export class SignupComponent {

	/**
	 * function called when get started button is clicked
	 * @param $event {Object} event information
	 */
	onGetStarted($event) {
		console.log("clicked");
	}
}