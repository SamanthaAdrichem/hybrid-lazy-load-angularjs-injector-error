import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PageHeaderComponent} from 'src/app/core/components/page-header/page-header.component';

@NgModule({
	declarations: [PageHeaderComponent],
	exports: [PageHeaderComponent],
	imports: [CommonModule],
	entryComponents: [PageHeaderComponent] // hybrid
})
export class PageHeaderModule {}
