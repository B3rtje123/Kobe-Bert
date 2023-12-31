import { Module } from "@nestjs/common"
import { FirebaseService } from "./service/firebase.service"
import { PassportModule } from "@nestjs/passport"
import { FirebaseAuthStrategy } from "./firebase.strategy"

@Module({
  imports: [PassportModule],
  providers: [FirebaseService, FirebaseAuthStrategy],
})
export class AuthenticationModule {}
