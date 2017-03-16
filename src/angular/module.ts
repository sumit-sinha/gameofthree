import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { IndexPageComponent } from "./pages/index/IndexPageComponent";
import { SignupComponent } from "./components/signup/SignupComponent";
import { NetworkRequestHelper } from "./helpers/network/NetworkRequestHelper";

@NgModule({
	imports: [
		HttpModule,
		BrowserModule,
		RouterModule.forRoot([{
			path: "",
			component: SignupComponent
		}])
	],
	declarations: [
		IndexPageComponent,
		SignupComponent
	],
	providers: [
		{provide: APP_BASE_HREF, useValue : '/' }, 
		NetworkRequestHelper
	],
	bootstrap: [IndexPageComponent]
})

class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
