import {NgModule} from '@angular/core';
import {UIRouterUpgradeModule} from '@uirouter/angular-hybrid';
import {StateDeclaration} from 'hybrid/state.declaration';
import {DashboardComponent} from 'src/app/core/pages/dashboard/dashboard.component';

const states: StateDeclaration[] = [{
	name: 'core-dashboard',
	url: '/dashboard',
	component: DashboardComponent,
 	permissions: [],
	requiresAuth: false
}];

@NgModule({
	imports: [
		UIRouterUpgradeModule.forChild({states: states})
	],
	exports: [
		UIRouterUpgradeModule
	],
})
export class DashboardRoutingModule {}
