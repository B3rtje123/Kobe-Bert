import { CreateClientInput } from "./dto/create-client.input";
import { UpdateClientInput } from "./dto/update-client.input";
import { Client } from "./entities/client.entity";
import { Repository } from "typeorm";
export declare class ClientService {
    private readonly clientRepository;
    constructor(clientRepository: Repository<Client>);
    findAll(): Promise<Client[]>;
    create(createClientInput: CreateClientInput): Promise<Client>;
    findOne(id: number): string;
    update(id: number, updateClientInput: UpdateClientInput): string;
    remove(id: number): string;
    saveAll(clients: Client[]): Promise<Client[]>;
    truncate(): Promise<void>;
}
