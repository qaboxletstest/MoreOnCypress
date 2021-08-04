describe('Testing the loading bar', () => {
    before(() => {
        // start recording
        cy.recordHar();
    });
    it('Search Cypress.io in Google', () => {
        cy.visit("https://www.google.in");
        cy.get("input[name='q']").type("https://docs.cypress.io/plugins/directory{enter}")
    });

    it('Youtube', () => {
        cy.visit("https://www.youtube.com/c/qaboxletstest/")
        cy.get('input#search').should("be.visible")
    });

    after(() => {
        // HAR will be saved as users.spec.har 
        // at the root of the project 
        cy.saveHar({
            outDir: './hars'
        });
    });
});