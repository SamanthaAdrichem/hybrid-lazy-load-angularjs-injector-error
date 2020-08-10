import {Component, OnDestroy} from '@angular/core';
import {StateService} from '@uirouter/core';
import {ProgramsService} from 'src/app/admin/data/backend/programs/programs.service';
import {ListModel} from 'src/app/core/components/messages/list.model';

@Component({
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent  {
	public messageList: ListModel = new ListModel();

	constructor(
		protected stateService: StateService
	) {}

	public goToAngularJs(): void {
		this.stateService.go('admin-publisher-register-queue');
	}

	public goToDashboard(): void {
		this.stateService.go('core-dashboard');
	}
}
