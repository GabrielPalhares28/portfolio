import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['{src,api}/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}', 'api/**/*.ts'],
      exclude: [
        'src/main.tsx',
        'src/test/**',
        '**/*.test.{ts,tsx}',
        '**/*.d.ts',
      ],
    },
  },
})
