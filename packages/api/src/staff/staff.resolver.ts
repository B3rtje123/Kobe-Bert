import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StaffService } from './staff.service';
import { Staff } from './entities/staff.entity';
import { CreateStaffInput } from './dto/create-staff.input';
import { UpdateStaffInput } from './dto/update-staff.input';

@Resolver(() => Staff)
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  @Mutation(() => Staff)
  createStaff(@Args('createStaffInput') createStaffInput: CreateStaffInput) {
    return this.staffService.create(createStaffInput);
  }

  @Query(() => [Staff], { name: 'staffs' })
  getStaff(){
    return[
      {
        id: "1",
        name: "Kobe",
        fullname: "Kode Despeghel",
        category: "medewerker",
        active: true
      }
    ]
  }

  @Query(() => Staff, { name: 'staff' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.staffService.findOne(id);
  }

  @Mutation(() => Staff)
  updateStaff(@Args('updateStaffInput') updateStaffInput: UpdateStaffInput) {
    return this.staffService.update(updateStaffInput.id, updateStaffInput);
  }

  @Mutation(() => Staff)
  removeStaff(@Args('id', { type: () => Int }) id: number) {
    return this.staffService.remove(id);
  }
}
