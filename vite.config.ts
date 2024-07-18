/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import GithubActionsReporter from 'vitest-github-actions-reporter';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['src/stories'],
      include: ['src/**/*.[jt]s?(x)']
    },
    setupFiles: ['src/vitest-setup.ts'],
    outputFile: {
      junit: "test-results.xml",
    },
    reporters: process.env.GITHUB_ACTIONS
      ? [
        "junit",
        new GithubActionsReporter({
          hideStackTrace: true,
          trimRepositoryPrefix: true,
        }),
      ]
      : "default",
  }

})
