"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const staff_service_1 = require("./staff.service");
const staff_entity_1 = require("./entities/staff.entity");
const create_staff_input_1 = require("./dto/create-staff.input");
const update_staff_input_1 = require("./dto/update-staff.input");
let StaffResolver = exports.StaffResolver = class StaffResolver {
    constructor(staffService) {
        this.staffService = staffService;
    }
    createStaff(createStaffInput) {
        return this.staffService.create(createStaffInput);
    }
    getStaff() {
        return [
            {
                id: '1',
                name: 'Duif',
                fullname: 'Duif',
                category: 'werknemer',
                active: true,
            }
        ];
    }
    findOne(id) {
        return this.staffService.findOne(id);
    }
    updateStaff(updateStaffInput) {
        return this.staffService.update(updateStaffInput.id, updateStaffInput);
    }
    removeStaff(id) {
        return this.staffService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => staff_entity_1.Staff),
    __param(0, (0, graphql_1.Args)('createStaffInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_input_1.CreateStaffInput]),
    __metadata("design:returntype", void 0)
], StaffResolver.prototype, "createStaff", null);
__decorate([
    (0, graphql_1.Query)(() => [staff_entity_1.Staff], { name: 'staffs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaffResolver.prototype, "getStaff", null);
__decorate([
    (0, graphql_1.Query)(() => staff_entity_1.Staff, { name: 'staff' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StaffResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => staff_entity_1.Staff),
    __param(0, (0, graphql_1.Args)('updateStaffInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_staff_input_1.UpdateStaffInput]),
    __metadata("design:returntype", void 0)
], StaffResolver.prototype, "updateStaff", null);
__decorate([
    (0, graphql_1.Mutation)(() => staff_entity_1.Staff),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StaffResolver.prototype, "removeStaff", null);
exports.StaffResolver = StaffResolver = __decorate([
    (0, graphql_1.Resolver)(() => staff_entity_1.Staff),
    __metadata("design:paramtypes", [staff_service_1.StaffService])
], StaffResolver);
//# sourceMappingURL=staff.resolver.js.map