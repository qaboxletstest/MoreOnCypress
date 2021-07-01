/// <reference types="cypress" />
const del = require('del')
module.exports = (on, config) => {
  on("task", {});
  on('after:spec', (spec, results) => {
    if (results.stats.failures === 0 && results.video) {
      return del(results.video)
    }
  })
  return config;
}
