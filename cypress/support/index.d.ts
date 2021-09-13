declare namespace Cypress {

    interface Chainable<Subject = any> {
        /**
         * Login to application and add Command Arguments to the console.
         *
         * @see https://app.netlify.com/sites/qaboxletstest-javascriptessentials
         * @example
         *    cy.login('email', 'password')          // Login to application
         */
        login(email: string, password: string): Chainable<Subject>

        /**
         * Login to application and add Command Arguments and Additional things to the console.
         *
         * @see https://app.netlify.com/sites/qaboxletstest-javascriptessentials
         * @example
         *    cy.loginConsole('email', 'password')          // Login to application
         */
        loginConsole(email: string, password: string): Chainable<Subject>

        /**
         * Custom command to Get a Web Element, Highlight in DOM and take snapshot.
         *
         * @see https://app.netlify.com/sites/qaboxletstest-javascriptessentials
         * @example
         *    cy.getter('task')          // Get a Web Element
         */
        getter(selector: string): Chainable<Subject>
    }

}