describe('Intercept GraphQL Request', () => {
    it.skip('Check ToDo is added - OLD SCHOOL WAY', () => {
        cy.visit("https://graphql-to-do-app-angular.herokuapp.com/")
        cy.contains("div.create-item-title", "Create New Item").click()
        cy.get('input[placeholder="Item Name"]').type("OLD SCHOOL")
        cy.get('input[value="Create Item"]').click()
        cy.contains("div#1 div.item-wrapper>div", "OLD SCHOOL", { timeout: 10000 })
            .should("be.visible")

    });

    it.only("Check ToDo is added - Yeah Baby...it's Cypress", () => {
        const URL = "https://graphql-java-spring-boot.herokuapp.com/graphql"
        cy.visit("https://graphql-to-do-app-angular.herokuapp.com/")
        // Intercept - Create Item
        cy.intercept("POST", URL, (req) => {
            if (req.body.operationName === "createItemMutation") {
                req.alias = "CreateItem"
                req.continue()
            }
        })
        // Intercept - Show on HomePage
        cy.intercept("POST", URL, (req) => {
            if (req.body.operationName === "homePageQuery") {
                req.alias = "RenderItem"
                req.continue()
            }
        })
        cy.contains("div.create-item-title", "Create New Item").click()
        cy.get('input[placeholder="Item Name"]').type("Intercept GraphQL Request")
        cy.get('input[value="Create Item"]').click()
        // Wait for both the requests to be completed
        cy.wait("@CreateItem")
        cy.wait("@RenderItem")
        cy.contains("div#1 div.item-wrapper>div", "Intercept GraphQL Request")
            .should("be.visible")

    });
});