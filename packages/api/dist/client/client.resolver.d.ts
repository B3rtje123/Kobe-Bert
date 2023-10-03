import { ClientService } from "./client.service";
import { Client } from "./entities/client.entity";
import { CreateClientInput } from "./dto/create-client.input";
import { UpdateClientInput } from "./dto/update-client.input";
import { UserRecord } from "firebase-admin/auth";
export declare class ClientResolver {
    private readonly clientService;
    constructor(clientService: ClientService);
    createClient(createClientInput: CreateClientInput): Promise<Client>;
    getClients(): {
        id: string;
        name: string;
        fullname: string;
        createdAt: Date;
    }[];
    findAll(currentUser: UserRecord): Promise<Client[]>;
    findOne(id: number): string;
    updateClient(updateClientInput: UpdateClientInput): string;
    removeClient(id: number): string;
}
