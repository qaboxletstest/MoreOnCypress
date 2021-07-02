/// <reference types="cypress" />
const del = require('del')
module.exports = (on, config) => {
  require('cypress-grep/src/plugin')(config)
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
