describe('NTLM APP', () => {
    it('Launch NTLM APP', () => {
        cy.ntlm(["localhost:9191"], Cypress.env("username"), Cypress.env("password"));
        cy.visit("http://localhost:9191")
        cy.get("[name = 'Channel Name']").type("NTLM Field")
        cy.get("[type='checkbox']").check()
    });
});