import { ExecutionContext } from "@nestjs/common";
declare const FireBaseGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class FireBaseGuard extends FireBaseGuard_base {
    getRequest(context: ExecutionContext): any;
}
export {};
