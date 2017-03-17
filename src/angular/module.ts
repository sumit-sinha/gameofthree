import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { IndexPageComponent } from "./pages/index/IndexPageComponent";
import { InformationPageComponent } from "./pages/info/InformationPageComponent";
import { SignupComponent } from "./components/signup/SignupComponent";
import { GamepageComponent } from "./components/game/GamepageComponent";
import { NetworkRequestHelper } from "./helpers/network/NetworkRequestHelper";

@NgModule({
	imports: [
		HttpModule,
		BrowserModule,
		RouterModule.forRoot([{
			path: "",
			component: SignupComponent
		}, {
			path: "game/:id",
			component: GamepageComponent
		}, {
			path: "info",
			component: InformationPageComponent
		}])
	],
	declarations: [
		IndexPageComponent,
		SignupComponent,
		GamepageComponent,
		InformationPageComponent
	],
	providers: [
		{provide: APP_BASE_HREF, useValue : '/' }, 
		NetworkRequestHelper
	],
	bootstrap: [IndexPageComponent]
})

class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
