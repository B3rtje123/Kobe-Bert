import { auth } from "firebase-admin";
import * as firebaseAdmin from "firebase-admin";
import { FirebaseService } from "./service/firebase.service";
type DecodedIdToken = firebaseAdmin.auth.DecodedIdToken;
export type FirebaseAuthDecodedUser = Readonly<Pick<DecodedIdToken, "uid" | "email" | "email_verified">>;
export declare const StrategyName = "firebase-auth";
declare const FirebaseAuthStrategy_base: new (...args: any[]) => any;
export declare class FirebaseAuthStrategy extends FirebaseAuthStrategy_base {
    private readonly firebase;
    private readonly checkRevoked;
    private readonly logger;
    constructor(firebase: FirebaseService);
    validate(jwtToken: string): Promise<auth.UserRecord>;
    private authorize;
}
export {};
