import { Auth } from "firebase-admin/lib/auth/auth";
export declare class FirebaseService {
    private firebaseApp;
    constructor();
    getAuth: () => Auth;
}
