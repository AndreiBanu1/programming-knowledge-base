import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // NestJS needs decorator metadata (emitDecoratorMetadata), which Vitest's default
  // transformer (esbuild) does not emit. SWC does, using the settings from the Nest
  // project's own tsconfig. For files that don't use decorators the output is equivalent.
  plugins: [swc.vite({ tsconfigFile: 'backend/simpleNestJSApi/tsconfig.json' })],
  test: {
    globals: true,
    include: ['**/*.{test,spec,problem,solution}.ts'],
    exclude: ['**/node_modules/**', 'scratch/**'],
  },
})
