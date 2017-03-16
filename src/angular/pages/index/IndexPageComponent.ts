import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "game-of-three",
	template: `
	    <nav class="light-blue lighten-1" role="navigation">
			<div class="nav-wrapper container">
				<a id="logo-container" href="javascript:void(0);" class="brand-logo">Game of Three</a>
			</div>
		</nav>
		<router-outlet></router-outlet>
	`,
	styles: [`

	`]
})

export class IndexPageComponent {

}
