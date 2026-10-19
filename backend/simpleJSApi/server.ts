import { createServer } from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'

const hostname = '127.0.0.1'
const port = 3000

const routes: Record<string, [string, string]> = {
  '/': ['./index.html', 'text/html; charset=utf-8'],
  '/index.js': ['./index.js', 'text/javascript; charset=utf-8'],
  '/style.css': ['./style.css', 'text/css; charset=utf-8'],
  '/api/users': ['./users.json', 'application/json; charset=utf-8'],
}

const server = createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url ?? '/', `http://${req.headers.host ?? hostname}`)
    console.log(req.method, pathname)

    const route = routes[pathname]

    if (route && req.method === 'GET') {
      const [file, contentType] = route
      const body = await readFile(new URL(file, import.meta.url), 'utf-8')

      res.statusCode = 200
      res.setHeader('Content-Type', contentType)
      res.end(body)
      return
    }

    if (pathname === '/message' && req.method === 'POST') {
      const chunks: Buffer[] = []
      for await (const chunk of req) {
        chunks.push(chunk)
      }
      const rawBody = Buffer.concat(chunks).toString() // e.g. "message=hello+world"
      const message = new URLSearchParams(rawBody).get('message') ?? ''

      await writeFile(new URL('./message.txt', import.meta.url), message)

      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
      return
    }

    res.statusCode = 404
    res.end('Not Found')
  } catch (err) {
    console.error(err)

    if (!res.headersSent) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    }
    res.end('Internal Server Error')
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
