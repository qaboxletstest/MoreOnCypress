describe('Replace Nested Thens with Alias', () => {

    beforeEach(() => {
        cy.intercept("http://localhost:4000/users?_start=0&_end=4").as("initial")
        cy.visit("http://localhost:3000/")
        cy.wait("@initial")
    })

    it.skip('Nested Then', () => {
        cy.get("span[ref='lbRecordCount']").then($el1 => {
            cy.get("span[ref='lbLastRowOnPage']").then($el2 => {
                cy.get("span[ref='lbFirstRowOnPage']").then($el3 => {
                    const totalRows = parseInt($el1.text())
                    const totalRowsUB = parseInt($el2.text())
                    const totalRowsLB = parseInt($el3.text())
                    const iterCount = (totalRows / totalRowsUB) - totalRowsLB
                    for (let index = 0; index < iterCount; index++) {
                        cy.contains("button.ag-paging-button", "Next").click()
                    }
                })
            })
        })
    });

    it.only('Alias', () => {
        cy.get("span[ref='lbRecordCount']").invoke("text").then(parseInt).as("totalRows")
        cy.get("span[ref='lbLastRowOnPage']").invoke("text").then(parseInt).as("totalRowsUB")
        cy.get("span[ref='lbFirstRowOnPage']").invoke("text").then(parseInt).as("totalRowsLB")
            .then(function () {
                const iterCount = (this.totalRows / this.totalRowsUB) - this.totalRowsLB
                for (let index = 0; index < iterCount; index++) {
                    cy.contains("button.ag-paging-button", "Next").click()
                }
            })
    });
});