import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import clonedeep from 'lodash/cloneDeep';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CacheService} from 'src/app/core/data/cache/cache.service';
import {LibString} from 'src/app/core/lib/string';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

	constructor(
		private cacheService: CacheService
	) {}

	private canBeCached(request: HttpRequest<any>): boolean {
		if (
			request.url
			&& LibString.startsWith(request.url, '/api')
			&& !LibString.startsWith(request.url, '/api/authenticate')
			&& request.method
			&& request.method.toUpperCase() === 'GET'
		) {
			return true;
		}
		return false;
	}

	private getPurgeUrl(request: HttpRequest<any>): string {
		switch (request.method) {
			case 'PUT':
			case 'DELETE':
				let url: string[] = request.url.split('/');
				url.pop();
				return url.join('/');

			default:
				return request.url;
		}
	}

	private isUpdate(request: HttpRequest<any>): boolean {
		if (
			request.url
			&& LibString.startsWith(request.url, '/api')
			&& !LibString.startsWith(request.url, '/api/authenticate')
			&& request.method
			&& request.method.toUpperCase() !== 'GET'
		) {
			// patch, post, put, delete
			return true;
		}
		return false;
	}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.isUpdate(request)) {
			this.cacheService.purgeByUrl(this.getPurgeUrl(request));
			return next.handle(request);
		}

		if (!this.canBeCached(request)) {
			return next.handle(request);
		}

		const cachedResponse: HttpResponse<any>|null = this.cacheService.get(request);
		if (cachedResponse !== null) {
			return of(cachedResponse.clone({body: clonedeep(cachedResponse.body)}));
		}

		return next.handle(request)
			.pipe(tap((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					this.cacheService.put(request, event.clone({body: clonedeep(event.body)}));
				}
			})
		);
	}
}
