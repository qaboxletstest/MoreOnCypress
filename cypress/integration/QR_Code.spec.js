describe('QR Code', () => {
    it.only('QR Code Tests', function () {
        cy.visit("http://127.0.0.1:5500/Other/qrcode.html")
        cy.get("div#output").last().screenshot(`${this.test.title}`).then(function () {
            cy.task("readQRCode", `../screenshots/${Cypress.spec.name}/${this.test.title}.png`).then(res => {
                expect(res.trim()).to.eq("QA BOX LET'S TEST")
            })
        })
    });

});