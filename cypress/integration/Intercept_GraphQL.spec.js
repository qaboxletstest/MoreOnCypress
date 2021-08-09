describe('Intercept GraphQL Request', () => {
    it('Check ToDo is added', () => {
        const URL = "https://graphql-java-spring-boot.herokuapp.com/graphql"
        cy.visit("https://graphql-to-do-app-angular.herokuapp.com/")
        cy.contains("div.create-item-title", "Create New Item").click()
        cy.get('input[placeholder="Item Name"]').type("Intercept GraphQL Request")

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
                req.alias = "HomePage"
                req.continue()
            }
        })
        cy.get('input[value="Create Item"]').click()
        cy.wait("@CreateItem")
        cy.wait("@HomePage")
        cy.contains("div#1 div.item-wrapper>div", "Intercept GraphQL Request")
            .should("be.visible")

    });
});