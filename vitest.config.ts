import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['**/*.{test,spec,problem,solution}.ts'],
    exclude: ['**/node_modules/**', 'algorithms/**', 'performance/**', 'scratch/**'],
  },
})
