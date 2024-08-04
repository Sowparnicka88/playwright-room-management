// playwright.config.js
module.exports = {
    testDir: './tests',
    timeout: 60000,
    retries: 1,
    reporter: [['html', { open: 'never' }]],
    use: {
        headless: true,
        browserName: 'chromium',
    },
};
