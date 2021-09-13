describe.skip('Add Logging to Custom Commands', () => {

    beforeEach(() => {
        cy.visit("https://the-internet.herokuapp.com/login")
    })

    it('Login Test', () => {
        cy.get("input#username").type("tomsmith")
        cy.get("input#password").type("SuperSecretPassword!")
        cy.get("button[type='submit']").click()
    });

    it.skip('Login Test - Custom Command - Add params to Console', () => {
        cy.login("tomsmith", "SuperSecretPassword!")
    });

    it.skip('Login Test - Custom Command - Add non-params to Console and Capture DOM Snapshot', () => {
        cy.loginConsole("tomsmith", "SuperSecretPassword!")
    });

});

describe.skip('Highlight DOM Element updated in Custom Commands', () => {

    beforeEach(() => {
        cy.visit("https://qaboxletstest-reacttodo.netlify.app/")
    })


    it('Without Custom Command', function () {
        cy.get("input[name='task']").type("With GET Command{enter}")
    });


    it('Highlight DOM Elements even for Custom Commands', function () {
        cy.getter("task").type("Create Custom GET Command{enter}")
    });

});