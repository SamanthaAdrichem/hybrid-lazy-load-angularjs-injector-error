import {NgModule} from '@angular/core';
import {NgHybridStateDeclaration, UIRouterUpgradeModule} from '@uirouter/angular-hybrid';

const states: NgHybridStateDeclaration[] = [{
	name: 'admin.search.**',
	url: '/admin/search',
	loadChildren: () => import ('./pages/search/search.module').then((module: any) => module.SearchModule)
}];

@NgModule({
	imports: [
		UIRouterUpgradeModule.forRoot({states: states})
	],
	exports: [
		UIRouterUpgradeModule
	],
})
export class RoutingModule {}
