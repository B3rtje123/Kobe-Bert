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
var FirebaseAuthStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuthStrategy = exports.StrategyName = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_http_bearer_1 = require("passport-http-bearer");
const firebase_service_1 = require("./service/firebase.service");
exports.StrategyName = "firebase-auth";
let FirebaseAuthStrategy = exports.FirebaseAuthStrategy = FirebaseAuthStrategy_1 = class FirebaseAuthStrategy extends (0, passport_1.PassportStrategy)(passport_http_bearer_1.Strategy, exports.StrategyName) {
    constructor(firebase) {
        super();
        this.firebase = firebase;
        this.checkRevoked = false;
        this.logger = new common_1.Logger(FirebaseAuthStrategy_1.name);
    }
    async validate(jwtToken) {
        const payload = await this.authorize(jwtToken);
        const user = await this.firebase.getAuth().getUser(payload.uid);
        if (user.disabled) {
            throw new common_1.ForbiddenException();
        }
        return user;
    }
    async authorize(jwtToken) {
        try {
            return await this.firebase
                .getAuth()
                .verifyIdToken(jwtToken, this.checkRevoked);
        }
        catch (err) {
            const e = err;
            if (e.code === "auth/id-token-expired") {
                this.logger.warn("auth/id-token-expired");
            }
            else if (e.code === "auth/id-token-revoked") {
                this.logger.warn("auth/id-token-revoked");
            }
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.FirebaseAuthStrategy = FirebaseAuthStrategy = FirebaseAuthStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], FirebaseAuthStrategy);
//# sourceMappingURL=firebase.strategy.js.map