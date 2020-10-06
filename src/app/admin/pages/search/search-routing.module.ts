import {NgModule} from '@angular/core';
import {UIRouterUpgradeModule} from '@uirouter/angular-hybrid';
import {StateDeclaration} from 'hybrid/state.declaration';
import {SearchComponent} from 'src/app/admin/pages/search/search.component';

const states: StateDeclaration[] = [{
	name: 'search',
	url: '/search',
	component: SearchComponent,
 	permissions: [],
	requiresAuth: false
}];

@NgModule({
	imports: [
		UIRouterUpgradeModule.forChild({states: states})
	]
})
export class SearchRoutingModule {}
