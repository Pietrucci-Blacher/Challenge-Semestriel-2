// @ts-check
const { devices } = require('@playwright/test');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
    testDir: './e2e',
    /* Maximum time one __tests__ can run for. */
    timeout: 30 * 1000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 5000,
    },
    /* Fail the build on CI if you accidentally left __tests__.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel __tests__ on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0,
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.VITE_ENDPOINT_FRONT_URL || 'http://localhost:5173',

        /* Collect trace when retrying the failed __tests__. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',

        /* Only on CI systems run the __tests__ headless */
        headless: !!process.env.CI,
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
            },
        },
        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: {
        //     ...devices['Pixel 5'],
        //   },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: {
        //     ...devices['iPhone 12'],
        //   },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: {
        //     channel: 'msedge',
        //   },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: {
        //     channel: 'chrome',
        //   },
        // },
    ],

    /* Folder for __tests__ artifacts such as screenshots, videos, traces, etc. */
    // outputDir: '__tests__-results/',

    /* Run your local dev server before starting the __tests__ */
    webServer: {
        /**
         * Use the dev server by default for faster feedback loop.
         * Use the preview server on CI for more realistic testing.
         */
        command: process.env.CI ? 'vite preview --port 5173' : 'vite dev',
        port: 5173,
        reuseExistingServer: !process.env.CI,
    },
};

module.exports = config;
