describe('Testing the loading bar', () => {
    before(() => {
        // start recording
        cy.recordHar();
    });
    it('Search Cypress.io in Google', () => {
        cy.visit("https://www.google.in");
        cy.get("input[name='q']").type("https://docs.cypress.io/plugins/directory{enter}")
    });

    it('Search QA Box Lets Test in Youtube', () => {
        cy.visit("https://www.google.in");
        cy.get("input[name='q']").type("https://www.youtube.com/c/qaboxletstest{enter}")
    });

    after(() => {
        // HAR will be saved as users.spec.har 
        // at the root of the project 
        cy.saveHar();
    });

});