describe('Testing the loading bar', () => {
    it('Check loading bar appears', () => {
        cy.visit("http://localhost:3000");
        // cy.intercept("/api/users?page=2", (req) => {
        //     return Cypress.Promise.delay(5000).then(() => req.continue())
        // }).as("users")
        cy.get("#load").click()
        cy.get("#loader").should("be.visible")
        cy.get("#loader").should("not.exist")
        cy.get("#users").should("exist")
    });

    it.only('iFramed App', () => {
        cy.ntlm(["localhost:9191"], Cypress.env("username"), Cypress.env("password"));
        cy.visit("http://127.0.0.1:5500/Other/frameApp.html")
    });
});