// Bootstrapping
import {enableProdMode, NgModuleRef, NgZone, ViewEncapsulation} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {UIRouter, UrlService} from '@uirouter/core';
import 'bootstrap/dist/js/bootstrap.js';
import 'expose-loader?jQuery!expose-loader?$!jquery';
import 'expose-loader?moment!moment';
import 'scripts/app.module';
import {AppModule} from 'src/app/app.module';
import {environment} from 'src/environments/environment';

// If ready
if (/comp|inter|loaded/.test(document.readyState)) {
	bootstrap();
} else {
	document.addEventListener('DOMContentLoaded', bootstrap);
}

function bootstrap(): void {

	if (true === environment.production) {
		enableProdMode();
	}

	platformBrowserDynamic().bootstrapModule(
		AppModule,
		[{
			defaultEncapsulation: ViewEncapsulation.None
		}]
	).then((platformRef: NgModuleRef<AppModule>) => {
		// Initialize the Angular Module
		// get() the UIRouter instance from DI to initialize the router
		const urlService: UrlService = platformRef.injector.get(UIRouter).urlService;

		// Instruct UIRouter to listen to URL changes
		platformRef.injector.get<NgZone>(NgZone).run(() => {
			urlService.listen();
			urlService.sync();
		});
	});
}
