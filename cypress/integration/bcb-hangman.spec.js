/* eslint-disable no-undef */
/* jshint esversion:9*/
/* jshint asi: true*/
/// <reference types="Cypress" />
context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    describe('bcb-hangman', () => {

        it('the element should be visible ', () => {
            cy.shadowGet('bcb-hangman')
                .shadowFind('h1')
                .should(e => {
                    expect(e[0].innerText, 'h1-inner text should be bcb-hangman').to.equal("bcb-hangman")
                })
        })
    })
})
