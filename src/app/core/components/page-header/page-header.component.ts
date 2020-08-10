import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
	selector: 'app-page-header',
	templateUrl: 'page-header.component.html',
	styleUrls: ['page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
	@Input() public padding?: boolean = true; // @todo: This option should be removed when the old pages(size) doesn't exist anymore.
	@Input() public pageDescription?: string = null;
	@Input() public pageTitle: string = null;
	public trustedPageDescription: SafeHtml = null;

	constructor(
		private sanitizer: DomSanitizer
	) {}

	public ngOnInit(): void {
		if (this.pageDescription) {
			this.trustedPageDescription = this.sanitizer.bypassSecurityTrustHtml(this.pageDescription.trim());
		}
	}
}
