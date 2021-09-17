describe('Client Side - Rendering, Sorting (Asc and Desc Both), Filtering and Pagination', () => {

    const rowSel = "#grid div.ag-body-viewport div[ref ='eContainer']>div[role='row']"
    const rowSortSel = "#grid div.ag-body-viewport div[ref ='eContainer']>div[aria-rowindex='"

    function readTable(rowSel, type) {
        let usersUI = []
        if (type === "default") {
            return cy.get(rowSel)
                .each((row, rowIndex) => {
                    let user = {}
                    cy.wrap(row).find("div[col-id]")
                        .each((col) => {
                            let att = col.attr('col-id')
                            switch (att) {
                                case "id":
                                    user.id = parseInt(col.find('span').text().trim())
                                    break;
                                case "email":
                                    user.email = col.text()
                                    break;
                                case "first_name":
                                    user.first_name = col.text()
                                    break;
                                case "last_name":
                                    user.last_name = col.text()
                                    break;
                                case "avatar":
                                    user.avatar = col.text()
                                    break;
                                default:
                                    throw new Error("New Column Added in the Grid")
                            }
                        })
                    usersUI[rowIndex] = user
                }).then(() => {
                    cy.wrap(usersUI)
                })
        } else if (type === "sort" || type === "filter") {
            return cy.get(rowSel)
                .each((row, rowIndex) => {
                    let user = {}
                    const sel = `${rowSortSel}${rowIndex + 3}']`
                    cy.get(sel).find("div[col-id]")
                        .each((col) => {
                            let att = col.attr('col-id')
                            switch (att) {
                                case "id":
                                    user.id = parseInt(col.find('span').text().trim())
                                    break;
                                case "email":
                                    user.email = col.text()
                                    break;
                                case "first_name":
                                    user.first_name = col.text()
                                    break;
                                case "last_name":
                                    user.last_name = col.text()
                                    break;
                                case "avatar":
                                    user.avatar = col.text()
                                    break;
                                default:
                                    throw new Error("New Column Added in the Grid")
                            }
                        })
                    usersUI[rowIndex] = user
                }).then(() => {
                    cy.wrap(usersUI)
                })
        } else {
            throw new Error("Wrong Type")
        }
    }

    function sortDataNum(arr, sortkey, type) {
        return type === "asc"
            ? arr.sort((a, b) => a[sortkey] - b[sortkey])
            : arr.sortData((a, b) => b[sortkey] - a[sortkey])
    }

    function sortDataString(arr, sortkey, type) {
        if (type === "asc") {
            return arr.sort((a, b) => {
                if (a[`${sortkey}`] < b[`${sortkey}`]) {
                    return -1
                }
                if (a[`${sortkey}`] > b[`${sortkey}`]) {
                    return 1
                }
                return 0
            })
        } else {
            return arr.sort((a, b) => {
                if (b[`${sortkey}`] < a[`${sortkey}`]) {
                    return -1
                }
                if (b[`${sortkey} `] > a[`${sortkey}`]) {
                    return 1
                }
                return 0
            })
        }
    }

    function filterData(arr, filterkey, filterVal) {
        return arr.filter(a => a[`${filterkey}`].includes(filterVal))
    }

    beforeEach(() => {
        cy.request({
            url: "https://reqres.in/api/users?page=2",
            method: 'GET'
        }).then(resp => {
            cy.wrap(resp.body.data)
        }).as("users")
        cy.intercept("https://reqres.in/api/users?page=2").as("usersAPI")
        cy.visit("http://localhost:3000")
    })

    it('Rendered - Check all of the data is rendered', function () {
        cy.wait("@usersAPI")
            .then(() => {
                readTable(rowSel, "default").then(res => {
                    expect(res).be.eql(this.users)
                })
            })
    });

    it('Sort Asc- Check all of the data is sorted', function () {
        cy.wait("@usersAPI")
        cy.get("#grid div.ag-header-container div[col-id='email']")
            .click()
            .invoke('attr', "aria-sort")
            .should("eq", "ascending")
        cy.then(() => {
            readTable(rowSel, "sort").then(res => {
                expect(res).be.eql(sortDataString(this.users, "email", "asc"))
            })
        })
    });

    it('Sort Desc- Check all of the data is sorted', function () {
        cy.wait("@usersAPI")
        cy.get("#grid div.ag-header-container div[col-id='email']")
            .click()
            .click()
            .invoke('attr', "aria-sort")
            .should("eq", "descending")
        cy.then(() => {
            readTable(rowSel, "sort").then(res => {
                expect(res).be.eql(sortDataString(this.users, "email", "asc"))
            })
        })
    });

    it('Filter- Check all of the data is sorted', function () {
        cy.wait("@usersAPI")
        cy.get("input[aria-label='First_name Filter Input']")
            .type("a")
            .wait(2000)
            .then(() => {
                readTable(rowSel, "filter").then(res => {
                    expect(res).be.eql(filterData(this.users, "first_name", "a"))
                })
            })
    });
});