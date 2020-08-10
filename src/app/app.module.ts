import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DoBootstrap, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {setAngularJSGlobal, UpgradeModule} from '@angular/upgrade/static';
import {TranslateModule} from '@ngx-translate/core';
import * as angular from 'angular';
import {DatepickerModule} from 'ngx-bootstrap/datepicker';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AdminModule} from 'src/app/admin/admin.module';
import {PageHeaderModule} from 'src/app/core/components/page-header/page-header.module';
import {CoreModule} from 'src/app/core/core.module';
import {AuthInterceptor} from 'src/app/core/interceptors/auth.interceptor';
import {CacheInterceptor} from 'src/app/core/interceptors/cache.interceptor';
import {GetAsPostInterceptor} from 'src/app/core/interceptors/get-as-post.interceptor';
import {GetMultiInterceptor} from 'src/app/core/interceptors/get-multi.interceptor';
import {RoutingModule} from 'src/app/routing.module';

setAngularJSGlobal(angular);

@NgModule({
	exports: [
		TranslateModule
	],
	imports: [
		AdminModule,
		BrowserAnimationsModule,
		BrowserModule,
		CoreModule,
		DatepickerModule.forRoot(),
		HttpClientModule,
		ModalModule.forRoot(),
		PageHeaderModule,
		RoutingModule,
		TranslateModule.forRoot(),
		UpgradeModule,
	],
	// All providers you need in AngularJS
	providers: [
		// Request interceptors, might be able to move them to the actual modules, but those are generated
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: GetAsPostInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: GetMultiInterceptor, multi: true },
	]
})
export class AppModule implements DoBootstrap {

	constructor(
		private upgrade: UpgradeModule
	) {}

	public ngDoBootstrap(): void {
		this.upgrade.bootstrap(document.body, ['dcApp'], {strictDi: true});
	}
}

