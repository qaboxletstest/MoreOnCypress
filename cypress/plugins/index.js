/// <reference types="cypress" />
const _ = require('lodash')
const del = require('del')
const path = require("path")
const { install, ensureBrowserFlags } = require('@neuralegion/cypress-har-generator');
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');

module.exports = (on, config) => {
  install(on, config);
  require('cypress-grep/src/plugin')(config)
  on("task", {
    axiosSingleFileUpload: axiosSingleFileUpload
  });
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

function axiosSingleFileUpload() {
  const filePath = path.join(__dirname, "../fixtures/Yey.jpg")
  var data = new FormData();
  data.append('operations', '{"query":"mutation($file:Upload!) {singleUploadFile(file: $file){url}}"}');
  data.append('map', '{"0": ["variables.file"]}');
  data.append('0', fs.createReadStream(filePath));

  var config = {
    method: 'post',
    url: 'http://localhost:4000/graphql',
    headers: {
      ...data.getHeaders()
    },
    data: data
  };

  return new Promise(async (resolve, reject) => {
    const response = await axios(config)
    const respBody = await JSON.stringify(response.data)
    resolve(respBody);
  })
}
