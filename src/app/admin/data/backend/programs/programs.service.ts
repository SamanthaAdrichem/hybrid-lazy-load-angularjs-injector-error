import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpParamsOptions} from 'hybrid/http-params.options';
import {Observable} from 'rxjs';
import {ProgramAdminInterface} from 'src/app/admin/data/backend/programs/program-admin.interface';

@Injectable()
export class ProgramsService {
	constructor(
		private httpClient: HttpClient
	) {}

	public get(filter?: any): Observable<ProgramAdminInterface[]> {
		return this.httpClient.get<ProgramAdminInterface[]>(
			`/api/admin/programs`,
			{params: new HttpParams(<HttpParamsOptions>{fromObject: filter as {}})}
		);
	}

	public getById(programId: number): Observable<ProgramAdminInterface> {
		return this.httpClient.get<ProgramAdminInterface>(
			`/api/admin/programs/${programId}`
		);
	}
}
