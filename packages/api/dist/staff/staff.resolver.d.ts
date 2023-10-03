import { StaffService } from './staff.service';
import { CreateStaffInput } from './dto/create-staff.input';
import { UpdateStaffInput } from './dto/update-staff.input';
export declare class StaffResolver {
    private readonly staffService;
    constructor(staffService: StaffService);
    createStaff(createStaffInput: CreateStaffInput): string;
    getStaff(): {
        id: string;
        name: string;
        fullname: string;
        category: string;
        active: boolean;
    }[];
    findOne(id: number): string;
    updateStaff(updateStaffInput: UpdateStaffInput): string;
    removeStaff(id: number): string;
}
