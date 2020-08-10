import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SearchModule} from 'src/app/admin/pages/search/search.module';
import {RoutingModule} from 'src/app/admin/routing.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RoutingModule,
		SearchModule
	]
})
export class AdminModule {}
