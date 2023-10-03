"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
let StaffService = exports.StaffService = class StaffService {
    create(createStaffInput) {
        return 'This action adds a new staff';
    }
    findAll() {
        return `This action returns all staff`;
    }
    findOne(id) {
        return `This action returns a #${id} staff`;
    }
    update(id, updateStaffInput) {
        return `This action updates a #${id} staff`;
    }
    remove(id) {
        return `This action removes a #${id} staff`;
    }
};
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)()
], StaffService);
//# sourceMappingURL=staff.service.js.map