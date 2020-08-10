import {Component, Input} from '@angular/core';
import {ListModel} from 'src/app/core/components/messages/list.model';
import {MessageModel} from 'src/app/core/components/messages/message.model';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
	@Input() public list: ListModel;

	public actionClick(message: MessageModel): void {
		if ('function' !== typeof message.action) {
			return;
		}
		message.action();
	}
}
