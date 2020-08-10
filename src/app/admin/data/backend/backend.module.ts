import {NgModule} from '@angular/core';
import {ProgramsService} from 'src/app/admin/data/backend/programs/programs.service';

@NgModule({
	providers: [
		ProgramsService,
	]
})
export class BackendModule {}
