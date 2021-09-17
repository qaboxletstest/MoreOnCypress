describe('Login Programatically and cy.session', () => {

    beforeEach(() => {
        // 
    })

    it.skip('Using UI - No Custom Login UI Command', () => {
        cy.visit("/")
        cy.get("input#username").type("Katharina_Bernier")
        cy.get("input#password").type("s3cret")
        cy.get("button[type='submit']").click()
        cy.get("h6[data-test='sidenav-username']").should("have.text", "@Katharina_Bernier")
    });


    it.skip('Using UI - Custom Login UI Command', function () {
        cy.loginUI("Katharina_Bernier", "s3cret")
    });

    it('Using API - Custom Login API Command', function () {
        cy.loginAPI("Katharina_Bernier", "s3cret")
        cy.visit("/user/settings")
    });

});