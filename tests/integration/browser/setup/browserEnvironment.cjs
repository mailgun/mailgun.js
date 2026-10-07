const { TestEnvironment } = require('jest-environment-node');
const puppeteer = require('puppeteer');
const puppeteerConfig = require('../jest-puppeteer.config.cjs');

class BrowserEnvironment extends TestEnvironment {
  async setup() {
    await super.setup();

    this.browser = await puppeteer.launch(puppeteerConfig.launch);
    this.global.browser = this.browser;
    this.global.page = await this.browser.newPage();
  }

  async teardown() {
    try {
      await this.browser?.close();
    } finally {
      await super.teardown();
    }
  }
}

module.exports = BrowserEnvironment;
