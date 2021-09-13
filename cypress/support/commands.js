Cypress.Commands.add("login", (uname, pwd) => {
    if (!uname) throw new Error("Please enter username!")
    if (!pwd) throw new Error("Please enter password!")

    Cypress.log({
        name: "login",
        displayName: "Login Custom Command",
        message: `uname - ${uname} pwd - ${pwd}`,
        // 
        consoleProps: () => {
            return {
                username: uname
            }
        }
    })

    cy.get("input#username").type(uname)
    cy.get("input#password").type(pwd)
    cy.get("button[type='submit']").click()
})

Cypress.Commands.add("loginConsole", (uname, pwd) => {
    if (!uname) throw new Error("Please enter username!")
    if (!pwd) throw new Error("Please enter password!")

    let secureAreaURL;
    let log = Cypress.log({
        autoEnd: false,
        name: "loginConsole",
        displayName: "Login Custom Command",
        message: `uname - ${uname} pwd - ${pwd}`,
        consoleProps: () => {
            return {
                username: uname,
                password: pwd,
                'Secure Area URL': secureAreaURL
            }
        }
    })

    log.snapshot()
    cy.get("input#username").type(uname)
    cy.get("input#password").type(pwd)
    cy.get("button[type='submit']").click()

    cy.url().then(url => {
        secureAreaURL = url
        log.snapshot()
        log.end()
    })
})

Cypress.Commands.add("getter", (attrValue) => {
    if (!attrValue) throw new Error("Please enter attribute value!")

    let element;
    let count;

    let log = Cypress.log({
        autoEnd: false,
        name: "getter",
        displayName: "Get Elements",
        message: `Name Attr - ${attrValue}`,
        consoleProps: () => {
            return {
                Selector: `input[name=${attrValue}]`,
                Yielded: element,
                Count: count
            }
        }
    })

    cy.get(`input[name=${attrValue}]`, { log: false }).then($el => {
        element = Cypress.dom.getElements($el)
        count = $el.length
        log.set({ $el })
        log.snapshot()
        log.end()
    })

    cy.on("fail", (err) => {
        log.error(err)
        log.end()
        throw err
    })
})