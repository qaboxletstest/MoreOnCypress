describe('Anchor Tag - ping attribute ', () => {
    it('ping attribute testing', () => {
        cy.visit("http://127.0.0.1:5500/Other/pingAttr.html")
        // INTERCEPT
        cy.intercept({
            "method": "POST",
            "url": "http://localhost:3000/ping?q=900"
        }).as("ping")
        cy.get("a#anchor").click()
        cy.location("pathname").should("equal", "/Other/shadowDom.html")
        // WAIT AND ASSERT PING-TO and PING-FROM REQUEST HEADERS
        cy.wait("@ping").its("request.headers").should("deep.include", {
            "ping-from": "http://127.0.0.1:5500/Other/pingAttr.html",
            "ping-to": "http://127.0.0.1:5500/Other/shadowDom.html"
        })
    });
});