import { fileURLToPath } from 'node:url'
import { transform } from '@swc/core'

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') && specifier.endsWith('.js') && context.parentURL) {
    const tsUrl = new URL(specifier.replace(/\.js$/, '.ts'), context.parentURL)
    if (existsSync(fileURLToPath(tsUrl))) return nextResolve(tsUrl.href, context)
  }
  return nextResolve(specifier, context)
}

export async function load(url, context, nextLoad) {
  if (!url.startsWith('file:') || !url.endsWith('.ts') || url.includes('/node_modules/')) {
    return nextLoad(url, context)
  }

  const filename = fileURLToPath(url)
  const { code } = await transform(readFileSync(filename, 'utf-8'), {
    filename,
    sourceMaps: 'inline',
    module: { type: 'es6' },
    jsc: {
      target: 'es2022',
      parser: { syntax: 'typescript', decorators: true },
      transform: { legacyDecorator: true, decoratorMetadata: true },
    },
  })

  return { format: 'module', source: code, shortCircuit: true }
}
