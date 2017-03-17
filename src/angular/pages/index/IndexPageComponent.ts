import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "game-of-three",
	template: `
	    <nav class="light-blue lighten-1" role="navigation">
			<div class="nav-wrapper container">
				<a id="logo-container" href="javascript:void(0);" class="brand-logo">Game of Three</a>
				<img src="/images/info.png" alt="Info" class="info-icon" (click)="onInfoClick($event)">
			</div>
		</nav>
		<router-outlet></router-outlet>
	`,
	styles: [`
		.info-icon {
			float: right;
			margin-top: 12px;
		}
		@media only screen and (min-width: 601px) {
			.info-icon {
				margin-top: 15px;
			}
		}
	`]
})

export class IndexPageComponent {

	constructor(private router: Router) {}

	/**
	 * function called when info icon is clicked
	 * @param $event {Object} event information
	 */
	onInfoClick($event) {
		this.router.navigateByUrl("/info");
	}
}
