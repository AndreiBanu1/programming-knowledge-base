import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'

export function setupDocs(app: INestApplication): void {
  const config = new DocumentBuilder().setTitle('Shipments API').setVersion('1.0.0').build()
  const document = SwaggerModule.createDocument(app, config)

  const http = app.getHttpAdapter()
  http.get('/openapi.json', (_req: unknown, res: { json: (body: unknown) => void }) => res.json(document))
  app.use('/scalar', apiReference({ url: '/openapi.json', pageTitle: 'Scalar API Reference' }))
}
