/// <reference types="cypress" />

const serverUrl = Cypress.config().serverUrl.development
import { userLogin } from '../../src/reducers/user'
const dispatch = action => cy.window().its('__store__').invoke('dispatch', action)

describe('Navbar', () => {
  before(() => {
    cy.request(`${serverUrl}/test/reset-seed`)

    const username = 'demo', password = 'reactdemo'
    cy.request('POST', `${serverUrl}/auth/login`, { username, password })
      .its('body')
      .as('currentUser')
  })

  it('can see navbar with buttons after logged in', function () {
    cy.visit('/')
    dispatch(userLogin(this.currentUser))
    cy.visit('/')
    cy.get('nav').should('contain', /task management app/i)
    cy.contains('button', 'create board', { matchCase: false }).should('be.visible')
    cy.contains('button', 'logout', { matchCase: false }).should('be.visible')
  })

  it('can see navbar without buttons if not logged in', function () {
    cy.visit('/')
    cy.get('nav').should('contain', /task management app/i)
    cy.contains('button', 'create board', { matchCase: false }).should('not.exist')
    cy.contains('button', 'logout', { matchCase: false }).should('not.exist')
  })
})