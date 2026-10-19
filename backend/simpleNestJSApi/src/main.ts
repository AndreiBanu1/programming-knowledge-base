import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'
import { setupDocs } from './docs.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  setupDocs(app)

  const port = Number(process.env.PORT ?? 3001)
  await app.listen(port)
  console.log(`Shipments API listening on http://localhost:${port} (docs: /scalar)`)
}

bootstrap()
