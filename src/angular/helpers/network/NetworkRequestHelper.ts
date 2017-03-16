import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, RequestMethod, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

@Injectable()
export class NetworkRequestHelper {

	constructor(private http: Http) {}

	/**
	 * function to make a request to server
	 * @param args {Object}
	 */
	request(args: Object) {

		this.http.request(args.url, this.getRequestOptions(args))
		.subscribe((response: Response) => {
			args.callback.success.fn(response, args.callback.success.args);
		}, (error: Response) => {
			args.callback.error.fn(error, args.callback.error.args);
		});
	}

	/**
	 * function to get {RequestOptions} object based on argument
	 * @param args {Object}
	 * @return {RequestOptions}
	 */
	private getRequestOptions(args: Object): RequestOptions {

		var options = new RequestOptions({
			method: (args.method==="POST")?RequestMethod.Post:RequestMethod.Get,
			url: args.url,
			body: this.getBody(args),
			headers: this.getHeaders(args),
			withCredentials: args.credentials === true
		});

		return options;
	}

	/**
	 * function get {Headers} object based on passed argument
	 * @param args {Object}
	 * @return {Headers}
	 */
	private getHeaders(args: Object): Headers {

		let headers = new Headers();
		headers.set("Content-Type", "application/x-www-form-urlencoded");
		
		if (args && args.headers) {
			for (let key in args.headers) {
				if (args.headers.hasOwnProperty(key)) {
					headers.set(key, args.headers[key]);
				}
			}
		}

		return headers;
	}

	/**
	 * function to get body based on passed argument
	 * @param args {Object}
	 * @return {any}
	 */
	private getBody(args: Object): any {

		if (args == null || args.parameters == null) {
			return null;
		}

		let body = "";
		for (let key in args.parameters) {
			if (args.parameters.hasOwnProperty(key)) {
				if (body.length > 0) {
					body += "&";
				}

				body += key + "=" + args.parameters[key];
			}
		}

		return body;
	}

}