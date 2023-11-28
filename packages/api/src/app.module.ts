import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthenticationModule } from "./authentication/authentication.module"
import { ConfigModule } from "@nestjs/config"
import { SeedModule } from "./seed/seed.module"
import { UsersModule } from "./users/users.module"
import { TicketsModule } from "./tickets/tickets.module"
import { LocationsModule } from "./locations/locations.module"
import { TicketTypeModule } from './ticket-type/ticket-type.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: "mongodb",
      // url: "mongodb://localhost:27028/api",
      url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, //DOCKER
      entities: [__dirname + "/**/*.entity.{js,ts}"],
      // synchronize: true, // Careful with this in production
      synchronize: process.env.NODE_ENV == "production" ? false : true,
      useNewUrlParser: true,
      useUnifiedTopology: true, // Disable deprecated warnings
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: process.env.NODE_ENV == "production" ? false : true,
    }),
    AuthenticationModule,
    SeedModule,
    UsersModule,
    TicketsModule,
    LocationsModule,
    TicketTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
