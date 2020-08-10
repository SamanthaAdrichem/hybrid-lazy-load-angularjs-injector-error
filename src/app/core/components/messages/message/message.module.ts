import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MessageComponent} from 'src/app/core/components/messages/message/message.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		MessageComponent
	],
	exports: [
		MessageComponent
	]
})
export class MessageModule {}
