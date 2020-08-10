import {NgModule} from '@angular/core';
import {UIRouterUpgradeModule} from '@uirouter/angular-hybrid';
import {StateDeclaration} from 'hybrid/state.declaration';
import {SearchComponent} from 'src/app/admin/pages/search/search.component';

const states: StateDeclaration[] = [{
	parent: '',
	name: 'admin.search',
	url: '/admin/search',
	component: SearchComponent,
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
export class SearchRoutingModule {}
