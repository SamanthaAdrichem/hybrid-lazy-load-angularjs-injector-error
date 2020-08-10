import {HttpResponse} from '@angular/common/http';

export class EntryModel<T> {
	public url: string;
	public response: HttpResponse<T>;
	public entryTime: number;

	constructor(entryModel: EntryModel<T> = null) {
		Object.assign(this, entryModel);
	}

}
