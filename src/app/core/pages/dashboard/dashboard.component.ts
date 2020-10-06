import {Component} from '@angular/core';
import {StateService} from '@uirouter/core';
import {ListModel} from 'src/app/core/components/messages/list.model';

@Component({
	selector: 'app-page-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
	public messageList: ListModel = new ListModel();

	constructor(
		protected stateService: StateService
	) {}

	public goToAngularJs(): void {
		this.stateService.go('admin-publisher-register-queue');
	}

	public goToLazyChild(): void {
		this.stateService.go('search');
	}
}
