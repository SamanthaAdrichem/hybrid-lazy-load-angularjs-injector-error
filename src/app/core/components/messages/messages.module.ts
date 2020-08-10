import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MessageModule} from 'src/app/core/components/messages/message/message.module';
import {MessagesComponent} from 'src/app/core/components/messages/messages.component';

@NgModule({
	imports: [
		CommonModule,
		MessageModule
	],
	declarations: [
		MessagesComponent
	],
	exports: [
		MessagesComponent
	]
})
export class MessagesModule {}
