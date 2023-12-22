import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { CustomLogger } from "./logger/customLogger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: new CustomLogger()})
  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
  await app.listen(3000)
  console.info(`Server is running on: ${await app.getUrl()}`)
}
bootstrap()
