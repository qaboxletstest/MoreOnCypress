describe('QR Code', () => {
    it.only('QR Code Tests', () => {
        cy.visit("http://testautomationpractice.blogspot.com/")
        cy.get("div.widget-content>img").last().screenshot('qrcode').then(function () {
            cy.task("readQRCode", "../screenshots/QR_Code.spec.js/qrcode.png").then(res => {
                expect(res).to.eq("Welcome to Selenium")
            })
        })
    });

});