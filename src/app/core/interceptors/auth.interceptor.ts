import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LibString} from 'src/app/core/lib/string';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor() {}

	private interceptError(err: any): Observable<any> {
		if (err instanceof HttpErrorResponse) {
			switch (err.status) {
				case 401:
					// logout expire
					break;
			}
		}
		return throwError(err);
	}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (request.url && LibString.startsWith(request.url, '/api')) {
			// add authorization header with jwt token if available
			let token: string = 'abcd'; // authservice get token
			if (token) {
				request = request.clone({
					setHeaders: {
						Authorization: `Bearer ${token}`
					},
					withCredentials: true
				});
			}
		}
		return next.handle(request)
			.pipe(catchError((error: any) => this.interceptError(error)));
	}
}
