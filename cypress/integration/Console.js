describe('Fail on console messages', () => {
    it('Custom', () => {
        cy.ntlm(["localhost:9191"], Cypress.env("username"), Cypress.env("password"));
        cy.visit("http://localhost:9191/console.html")
    });
});