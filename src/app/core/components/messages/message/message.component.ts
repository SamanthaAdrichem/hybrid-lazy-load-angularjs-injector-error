import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TypeEnum} from 'src/app/core/components/messages/message/type.enum';

@Component({
	selector: 'app-messages-message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
	@Input() public actionMessage?: string;
	@Input() public blink: boolean = false;
	@Input() public iconReference: string = null;
	@Input() public permanent: boolean = false;
	@Input() public small: boolean = false;
	@Input() public type: TypeEnum = TypeEnum.WARNING;
	@Output() public action: EventEmitter<void> = new EventEmitter<void>();
	@Output() public removeMessage: EventEmitter<void> = new EventEmitter<void>();
	public readonly TypeEnum: typeof TypeEnum = TypeEnum;
}
