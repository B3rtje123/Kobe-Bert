import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { ClientModule } from "./client/client.module"
import { StaffModule } from "./staff/staff.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthenticationModule } from "./authentication/authentication.module"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: "mongodb",
      url: "mongodb://localhost:27028/api",
      entities: [__dirname + "/**/*.entity.{js,ts}"],
      synchronize: true, // Careful with this in production
      useNewUrlParser: true,
      useUnifiedTopology: true, // Disable deprecated warnings
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ClientModule,
    StaffModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
