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
import { MongoMemoryServer } from "mongodb-memory-server"
import { TicketTypeModule } from "./ticket-type/ticket-type.module"

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
          const mongo = await MongoMemoryServer.create({
            instance: {
              dbName: process.env.DB_NAME,
            },
          })

          const mongoUri = mongo.getUri()
          console.log("🍃 mongoUri", mongoUri)

          return {
            type: "mongodb",
            url: `${mongoUri}${process.env.DB_NAME}`,
            entities: [__dirname + "/**/*.entity.{js,ts}"],
            synchronize: process.env.NODE_ENV == "production" ? false : true, // Careful with this in production
            useNewUrlParser: true,
            useUnifiedTopology: true, // Disable deprecated warnings
          }
        } else {
          return {
            type: "mongodb",
            url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, // DOCKER
            entities: [__dirname + "/**/*.entity.{js,ts}"],
            synchronize: process.env.NODE_ENV == "production" ? false : true, // Careful with this in production
            useNewUrlParser: true,
            useUnifiedTopology: true, // Disable deprecated warnings
          }
        }
      },
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
