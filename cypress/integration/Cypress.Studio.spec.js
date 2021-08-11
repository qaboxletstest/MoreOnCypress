describe("Cypress Studio Demo 1", function () {
    it.skip('Add Test Steps', () => {
        cy.ntlm(["localhost:9191"], Cypress.env("username"), Cypress.env("password"));
        cy.visit("http://localhost:9191")
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > :nth-child(2) > input').clear();
        cy.get(':nth-child(1) > :nth-child(2) > input').type('QA BOX LET\'S TEST');
        cy.get('[value="Cats"]').check();
        cy.get('[value="Dogs"]').check();
        cy.get('button > span').click();
        cy.get('#myList > li').should('have.text', 'ELEMENT PREFERENCE ORDER - Search');
        /* ==== End Cypress Studio ==== */
    });
});

describe("Cypress Studio Demo 2", function () {
    /* ==== Test Created with Cypress Studio ==== */
    it('Select DropDown Test', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('https://the-internet.herokuapp.com/');
        cy.get(':nth-child(11) > a').click();
        cy.get('#dropdown').select('1');
        /* ==== End Cypress Studio ==== */
    });
});
