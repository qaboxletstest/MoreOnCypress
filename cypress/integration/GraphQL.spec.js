import { select_user, create_user, update_user, delete_user } from "../GraphQLBody/Users"

describe('GraphQL Endpoints Test Suite', () => {
    const URL = "http://localhost:4000/graphql";

    it.skip('Mutation - Create User', () => {
        cy.request({
            url: URL,
            method: "POST",
            body: {
                query: create_user
            }
        }).then(res => {
            console.log(res.body)
        })
    });

    it.skip('Query - Select Users', () => {
        cy.request({
            url: URL,
            method: "POST",
            body: {
                query: select_user
            }
        }).then(res => {
            expect(res.body.data.users).to.have.length(1);
        })
    });

    it.skip('Mutation - Update User', () => {
        cy.request({
            url: URL,
            method: "POST",
            body: {
                query: update_user
            }
        }).then(res => {
            console.log(res.body)
        })
    });

    it.skip('Mutation - Delete User', () => {
        cy.request({
            url: URL,
            method: "POST",
            body: {
                query: delete_user
            }
        }).then(res => {
            console.log(res.body)
        })
    });
});