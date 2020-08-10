import {StatusEnum} from 'src/app/admin/data/backend/programs/status.enum';

export interface ProgramAdminInterface {
	id: number;
	name: string;
	status: StatusEnum;
}
