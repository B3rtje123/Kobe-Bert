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
exports.ClientResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_service_1 = require("./client.service");
const client_entity_1 = require("./entities/client.entity");
const create_client_input_1 = require("./dto/create-client.input");
const update_client_input_1 = require("./dto/update-client.input");
const user_decorator_1 = require("../authentication/decorators/user.decorator");
const firebase_guard_1 = require("../authentication/service/guards/firebase.guard");
const auth_1 = require("firebase-admin/auth");
const common_1 = require("@nestjs/common");
let ClientResolver = exports.ClientResolver = class ClientResolver {
    constructor(clientService) {
        this.clientService = clientService;
    }
    createClient(createClientInput) {
        return this.clientService.create(createClientInput);
    }
    getClients() {
        return [
            {
                id: "jfksdqjf44s4",
                name: "Dave",
                fullname: "Dave de duif",
                createdAt: new Date(),
            },
        ];
    }
    findAll(currentUser) {
        return this.clientService.findAll();
    }
    findOne(id) {
        return this.clientService.findOne(id);
    }
    updateClient(updateClientInput) {
        return this.clientService.update(updateClientInput.id, updateClientInput);
    }
    removeClient(id) {
        return this.clientService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => client_entity_1.Client),
    __param(0, (0, graphql_1.Args)("createClientInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_input_1.CreateClientInput]),
    __metadata("design:returntype", void 0)
], ClientResolver.prototype, "createClient", null);
__decorate([
    (0, graphql_1.Query)(() => [client_entity_1.Client], { name: "getClientsPlaceholder" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientResolver.prototype, "getClients", null);
__decorate([
    (0, common_1.UseGuards)(firebase_guard_1.FireBaseGuard),
    (0, graphql_1.Query)(() => [client_entity_1.Client], { name: "getAllClients" }),
    __param(0, (0, user_decorator_1.FirebaseUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.UserRecord]),
    __metadata("design:returntype", void 0)
], ClientResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => client_entity_1.Client, { name: "client" }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClientResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => client_entity_1.Client),
    __param(0, (0, graphql_1.Args)("updateClientInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_client_input_1.UpdateClientInput]),
    __metadata("design:returntype", void 0)
], ClientResolver.prototype, "updateClient", null);
__decorate([
    (0, graphql_1.Mutation)(() => client_entity_1.Client),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClientResolver.prototype, "removeClient", null);
exports.ClientResolver = ClientResolver = __decorate([
    (0, graphql_1.Resolver)(() => client_entity_1.Client),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientResolver);
//# sourceMappingURL=client.resolver.js.map