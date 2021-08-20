describe('Cypress Wrap Command', () => {

    const person = (pname, ms) => {
        console.log('Promise begin...')
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('Promise finished...Person returned...')
                resolve({ name: pname })
            }, ms)
        })
    }

    // beforeEach(() => {
    //     cy.ntlm(["localhost:9191"], Cypress.env("username"), Cypress.env("password"));
    //     cy.visit("http://localhost:9191")
    // })

    it.skip('Wrap previously yielded jQuery Objects', () => {
        cy.get("[name = 'Channel Name']").then($inp => {
            // jQuery to set Value
            $inp.val("QA BOX")
            // How to now use Cypress Type Command?
            // cy.wrap($inp).type("QA BOX LET'S TEST")
        })
    });

    it.skip('Wrap Variables/Objects/Arrays etc', () => {

        // Check Variable has specific Value
        let name = "QA BOX LET'S TEST"
        cy.wrap(name).should("eq", "QA BOX LET'S TEST")

        // Check Object has a certain Property and Value
        let channel = { name: "QA BOX LET'S TEST" }
        cy.wrap(channel).should("have.property", "name", "QA BOX LET'S TEST")

        // Check Array includes an Item
        let playlists = ["JavaScript", "TypeScript", "Cypress", "Mocha, Chai & Sinon",
            "jQuery", "Xpath", "Important API Testing 101 Concepts", "Postman"]
        cy.wrap(playlists).should("include", "Cypress")
    });

    it.only('Wrap JavaScript Promise', () => {
        // Test Case Completes immediately
        // TC doesn't wait for the promise to complete
        // let p = person("Avi", 3000)

        // Also, couldn't test if the promise has returned the Person Object
        // Solution???? - WRAP
        // cy.wrap(p).should("have.property", "name", "Avi")

        // resolved promises are returned immediately 
        // cy.wrap(p)
        // Promise still starts immediately...and Cypress commands are chained
        // So if we want this promise to execute after any CYPRESS command, we run promise inside THEN Block
        cy.ntlm(["localhost:9191"], Cypress.env("username"), Cypress.env("password"));
        cy.visit("http://localhost:9191").then(() => {
            let p = person("Avi", 30)
            cy.wrap(p)
        })


    });
});