/// <reference types="cypress">

describe('How to capture videos of failed test cases properly?', () => {
    it('Failing Test Case', () => {
        cy.visit("https://www.google.in");
        cy.get("input[name='q']").type("https://www.youtube.com/c/qaboxletstest{enter}")
        cy.title().should("eq", "https://www.youtube.com/c/qaboxletstests - Google Search")
    });

    afterEach(function () {
        if (this.currentTest.state === "failed") {
            cy.wait(10000)
        }
    })

});