import { CreateStaffInput } from './dto/create-staff.input';
import { UpdateStaffInput } from './dto/update-staff.input';
export declare class StaffService {
    create(createStaffInput: CreateStaffInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateStaffInput: UpdateStaffInput): string;
    remove(id: number): string;
}
