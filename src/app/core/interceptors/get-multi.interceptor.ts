import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class GetMultiInterceptor implements HttpInterceptor {
	public static readonly BACKEND_MAX_PER_PAGE: number = 1000;

	private getAdditionalRequests(primaryResponse: any, request: HttpRequest<any>, next: HttpHandler, maxItems: number): Observable<any> {
		if (typeof primaryResponse !== 'object' || !(primaryResponse instanceof HttpResponse)) {
			return of(primaryResponse);
		}
		let totalCount: number = parseInt(primaryResponse.headers.get('x-total-count'), 10) || 0;
		if (0 === totalCount || totalCount <= GetMultiInterceptor.BACKEND_MAX_PER_PAGE) {
			return of(primaryResponse);
		}

		let pageCount: number = Math.ceil((maxItems < totalCount ? maxItems : totalCount) / GetMultiInterceptor.BACKEND_MAX_PER_PAGE);
		let requests: Observable<any>[] = [];
		for (let nextPage: number = 2; nextPage <= pageCount; ++nextPage) {
			requests.push(next.handle(request.clone(this.getRequestUpdateForPage(request, nextPage))));
		}
		return forkJoin(requests)
			.pipe(switchMap((subResponses: HttpResponse<any>[]) => {
				let outputArray: any[] = primaryResponse.body;
				subResponses.map((subResponse: HttpResponse<any>) => {
					outputArray = outputArray.concat(subResponse.body);
				});
				Object.assign(primaryResponse, {body: outputArray});
				return of(primaryResponse);
			}));
	}

	private getRequestedPage(request: HttpRequest<any>): number {
		if (request.body && request.body.page) {
			return parseInt(request.body.page, 10) || 1;
		}
		if (request.params) {
			let page: number = parseInt(request.params.get('page'), 10);
			if (page) {
				return page;
			}
		}
		return 1;
	}

	private getRequestedPageSize(request: HttpRequest<any>): number|null {
		if (request.body && request.body.per_page) {
			return parseInt(request.body.per_page, 10) || null;
		}
		if (request.params) {
			let page: number = parseInt(request.params.get('per_page'), 10);
			if (page) {
				return page;
			}
		}
		return null;
	}

	private getRequestUpdateForPage(request: HttpRequest<any>, page: number, pageSize: number = null): object {
		if (request.body && !request.params.get('page') && !request.params.get('per_page')) {
			let body: object = {};
			Object.assign(body, request.body);
			Object.assign(body, {
				page: page,
				per_page: pageSize || GetMultiInterceptor.BACKEND_MAX_PER_PAGE
			});
			return {
				body: body
			};
		}

		if (request.params && (request.params.get('page') || request.params.get('per_page'))) {
			let params: HttpParams = new HttpParams();
			request.params.keys().map((paramName: string) => {
				params.set(paramName, request.params.get(paramName));
			});
			params.set('page', page.toString());
			params.set('per_page', GetMultiInterceptor.BACKEND_MAX_PER_PAGE.toString());
			return {
				params: params
			};
		}
		return {};
	}

	private isGetRequest(request: HttpRequest<any>): boolean {
		if ('string' === typeof request.method && request.method.toUpperCase() === 'GET') {
			return true;
		}
		if (request.headers) {
			let overrideHeader: string = request.headers.get('x-http-method-override');
			if ('string' === typeof overrideHeader && overrideHeader.toUpperCase() === 'GET') {
				return true;
			}
		}
		return false;
	}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.isGetRequest(request)) {
			let page: number|null = this.getRequestedPage(request);
			let pageSize: number|null = this.getRequestedPageSize(request);

			if (page === 1 && pageSize && pageSize > GetMultiInterceptor.BACKEND_MAX_PER_PAGE) {
				return next.handle(request.clone(this.getRequestUpdateForPage(request, 1)))
					.pipe(switchMap(
						(primaryResponse: any) => this.getAdditionalRequests(primaryResponse, request, next, pageSize)
					));
			}
			return next.handle(request.clone(this.getRequestUpdateForPage(request, page, pageSize)));
		}
		return next.handle(request);
	}

}
