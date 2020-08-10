import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {MessagesModule} from 'src/app/core/components/messages/messages.module';
import {PageHeaderModule} from 'src/app/core/components/page-header/page-header.module';
import {DashboardRoutingModule} from 'src/app/core/pages/dashboard/dashboard-routing.module';
import {DashboardComponent} from 'src/app/core/pages/dashboard/dashboard.component';

@NgModule({
	declarations: [
		DashboardComponent
	],
	exports: [
		DashboardComponent
	],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		MessagesModule,
		PageHeaderModule,
		TranslateModule
	]
})
export class DashboardModule {}
