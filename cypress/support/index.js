// Import commands.js using ES2015 syntax:
import "./commands";
// cypress/support/index.js
require('cypress-failed-log')

require('cypress-grep')()
require('@neuralegion/cypress-har-generator/commands')
import "cypress-ntlm-auth/dist/commands";
import failOnConsoleError, { consoleType } from 'cypress-fail-on-console-error';
const config = {
    excludeMessages: ['foo', '^some bar-regex.*'],
    includeConsoleTypes: [
        consoleType.ERROR,
        consoleType.WARN,
        consoleType.INFO
    ]
};

// failOnConsoleError(config);

Cypress.on("window:before:load", win => {
    // cy.stub(win.console, "error").callsFake(msg => {
    //     // log out to the terminal
    //     cy.now("task", "error", msg)
    //     // log to Command Log and fail the test
    //     throw new Error(msg)
    // })
    // cy.stub(win.console, "warn").callsFake(msg => {
    //     // log out to the terminal
    //     cy.now("task", "warn", msg)
    //     // log to Command Log and fail the test
    //     throw new Error(msg)
    // })

    // cy.stub(win.console, "log").callsFake(msg => {
    //     // log out to the terminal
    //     cy.now("task", "log", msg)
    //     // log to Command Log and fail the test
    //     throw new Error(msg)
    // })

})

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

// Cypress.SelectorPlayground.defaults({
//     selectorPriority:['id', 'class', 'attribute']
// })