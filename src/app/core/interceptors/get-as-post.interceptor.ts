import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LibString} from 'src/app/core/lib/string';

@Injectable()
export class GetAsPostInterceptor implements HttpInterceptor {

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (
			request.url
			&& LibString.startsWith(request.url, '/api')
			&& request.method
			&& request.method.toUpperCase() === 'GET'
		) {
			let body: {[key: string]: any} = {};
			request.params.keys().map((paramName: string) => {
				body[paramName] = request.params.getAll(paramName);
				body[paramName] = body[paramName].length === 1 ? Object.values(body[paramName]).pop() : body[paramName];
			});
			request = request.clone({
				method: 'POST',
				setHeaders: {
					'X-HTTP-Method-Override': request.method
				},
				params: new HttpParams(),
				body: body
			});
		}
		return next.handle(request);
	}
}
