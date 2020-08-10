import {TypeEnum} from 'src/app/core/components/messages/message/type.enum';

export class MessageModel {
	public action?: () => any = null;
	public actionMessage?: string;
	public blink?: boolean = false;
	public containsHtml?: boolean = false;
	public iconReference?: string = null;
	public message: string = null;
	public permanent?: boolean = false;
	public type?: TypeEnum = TypeEnum.WARNING;
	public uniqueId?: any = null;

	constructor(messageModel?: Partial<MessageModel>) {
		Object.assign(this, messageModel);
	}

}
