import {HttpErrorResponse} from '@angular/common/http';
import {MessageModel} from 'src/app/core/components/messages/message.model';
import {LibArray} from 'src/app/core/lib/array';

export class ListModel {
	public messages: MessageModel[] = [];

	public addMessage(message: MessageModel): void {
		let foundMessage: MessageModel = message.uniqueId
			? LibArray.findOne(this.messages, {uniqueId: message.uniqueId})
			: null;
		if (foundMessage) {
			this.removeMessage(foundMessage);
		}
		this.messages.push(message);
	}

	public clear(): void {
		this.messages = [];
	}

	public removeMessage(message: MessageModel | number): void {
		if ('number' === typeof(message)) {
			LibArray.removeIndex(this.messages, message);
			return;
		}
		LibArray.removeValue(this.messages, message);
	}

	public handleError(error: any, uniqueId?: string): void {
		if ('undefined' === typeof uniqueId) {
			uniqueId = 'generic-error';
		}
		if (error instanceof Error) {
			console.log(error);
		}
		if (error instanceof HttpErrorResponse) {
			this.addMessage(<MessageModel>{
				uniqueId: uniqueId,
				message: error.error.error
			});
			return;
		}
		if ('string' === typeof error) {
			this.addMessage(<MessageModel>{
				uniqueId: uniqueId,
				message: error
			});
			return;
		}
		this.addMessage(<MessageModel>{
			uniqueId: uniqueId,
			message: JSON.stringify(error)
		});
	}
}
