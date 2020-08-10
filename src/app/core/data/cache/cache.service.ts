import {HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EntryModel} from 'src/app/core/data/cache/entry.model';

@Injectable({
	providedIn: 'root'
})
export class CacheService {
	public static readonly CACHE_LIFETIME: number = 900000; // 15 min in milliseconds

	private cacheMap: Map<string, EntryModel<any>> = new Map<string, EntryModel<any>>();

	private isExpired(entryTime: number): boolean {
		return Boolean((Date.now() - entryTime) > CacheService.CACHE_LIFETIME);
	}

	private prune(): void {
		this.cacheMap.forEach((cacheEntry: EntryModel<any>) => {
			if (this.isExpired(cacheEntry.entryTime)) {
				this.cacheMap.delete(cacheEntry.url);
			}
		});
	}

	public clear(): void {
		this.cacheMap.clear();
	}

	public get<T>(request: HttpRequest<T>): HttpResponse<T>|null {
		let cacheEntry: EntryModel<T> = this.cacheMap.get(request.urlWithParams);
		if (!cacheEntry) {
			return null;
		}

		if (this.isExpired(cacheEntry.entryTime)) {
			return null;
		}

		return cacheEntry.response;
	}

	public purgeByUrl(purgeUrl: string): void {
		this.cacheMap.forEach((cacheEntry: EntryModel<any>) => {
			if (cacheEntry.url.toLowerCase().startsWith(purgeUrl)) {
				this.cacheMap.delete(cacheEntry.url);
			}
		});
	}

	public put<T>(request: HttpRequest<T>, response: HttpResponse<T>): void {
		const newCacheEntry: EntryModel<T> = new EntryModel<T>(<EntryModel<T>>{
			url: request.urlWithParams,
			response: response,
			entryTime: Date.now()
		});
		this.cacheMap.set(request.urlWithParams, newCacheEntry);
		this.prune();
	}
}
