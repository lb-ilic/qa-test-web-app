import { defineConfig, devices } from '@playwright/test';

export default defineConfig( {
  testDir: './tests',
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://qa-test-web-app.vercel.app/',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices[ 'Desktop Chrome' ] },
    },

    {
      name: 'firefox',
      use: { ...devices[ 'Desktop Firefox' ] },
    },

    {
      name: 'webkit',
      use: { ...devices[ 'Desktop Safari' ] },
    },
  ]
} );
