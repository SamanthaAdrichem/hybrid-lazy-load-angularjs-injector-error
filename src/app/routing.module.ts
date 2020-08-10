import {NgModule} from '@angular/core';
import {NgHybridStateDeclaration, UIRouterUpgradeModule} from '@uirouter/angular-hybrid';

const states: NgHybridStateDeclaration[] = [{
	name: 'admin.**',
	url: '/admin',
	loadChildren: () => import ('./admin/admin.module').then((module: any) => module.AdminModule)
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
