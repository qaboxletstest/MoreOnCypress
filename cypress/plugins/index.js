/// <reference types="cypress" />
const del = require('del')
const path = require("path")
const { install, ensureBrowserFlags } = require('@neuralegion/cypress-har-generator');

module.exports = (on, config) => {
  install(on, config);
  require('cypress-grep/src/plugin')(config)
  on('before:browser:launch', (browser, launchOptions) => {
    ensureBrowserFlags(browser, launchOptions);
    // supply the absolute path to an unpacked extension's folder
    // NOTE: extensions cannot be loaded in headless Chrome
    // launchOptions.extensions.push('C:/Training/MoreOnCypress/Ignore X-Frame headers')
    launchOptions.extensions.push(path.resolve(__dirname, "../../Ignore X-Frame headers"))
    return launchOptions
  })
  on("task", {});
  on('after:spec', (spec, results) => {
    if (results.stats.failures === 0 && results.video) {
      return del(results.video)
    }
  })
  on('after:spec', (spec, results) => {
    if (results && results.video) {
      // Do we have failures for any retry attempts?
      const failures = _.some(results.tests, (test) => {
        return _.some(test.attempts, { state: 'failed' })
      })
      if (!failures) {
        // delete the video if the spec passed and no tests retried
        return del(results.video)
      }
    }
  })
  return config;
}
