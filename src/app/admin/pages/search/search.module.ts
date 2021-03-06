import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {NgHybridStateDeclaration, UIRouterUpgradeModule} from '@uirouter/angular-hybrid';
import {BackendModule} from 'src/app/admin/data/backend/backend.module';
import {SearchRoutingModule} from 'src/app/admin/pages/search/search-routing.module';
import {SearchComponent} from 'src/app/admin/pages/search/search.component';
import {MessagesModule} from 'src/app/core/components/messages/messages.module';
import {PageHeaderModule} from 'src/app/core/components/page-header/page-header.module';

const states: NgHybridStateDeclaration[] = [{
	name: 'search',
	url: '/search',
	component: SearchComponent
}];

@NgModule({
	declarations: [SearchComponent],
	imports: [
		BackendModule,
		CommonModule,
		MessagesModule,
		PageHeaderModule,
		SearchRoutingModule,
		TranslateModule,
	],
	exports: [SearchComponent]
})
export class SearchModule {}
