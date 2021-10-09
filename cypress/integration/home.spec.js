/// <reference types="cypress" />

const serverUrl = 'http://localhost:5000'

describe('The Home Page', () => {
  beforeEach(() => {
    cy.request(`${serverUrl}/test/reset-seed`)
  })

  it('successfully loads and redirect to login', () => {
    cy.visit('/')
    cy.location('pathname').should('eq', '/login')
  })

  it('can login successfully', () => {
    const username = 'demo', password = 'reactdemo'
    cy.visit('/login')
    cy.get('h2').contains(/login/i).should('be.visible')
    expect(localStorage.getItem('accessToken')).to.be.null

    cy.get('input[name=username]').type(username)
    cy.get('input[name=password]').type(`${password}{enter}`)
    cy.location('pathname').should('eq', '/').should(() => {
      expect(localStorage.getItem('accessToken')).to.includes('')
    })
  })

  it('can signup successfully', () => {
    const username = 'demo2', password = 'reactdemo'
    cy.visit('/signup')
    cy.get('h2').contains(/sign up/i).should('be.visible')
    expect(localStorage.getItem('accessToken')).to.be.null

    cy.get('input[name=username]').type(username)
    cy.get('input[name=password]').type(`${password}{enter}`)
    cy.location('pathname').should('eq', '/').should(() => {
      expect(localStorage.getItem('accessToken')).to.includes('')
    })

    // initially no board
    cy.get('.board-single')
      .should('have.length', 0)

    cy.contains('button', 'logout', { matchCase: false })
      .click()

    cy.location('pathname').should('eq', '/login')

    cy.get('input[name=username]').type(username)
    cy.get('input[name=password]').type(`${password}{enter}`)
    cy.location('pathname').should('eq', '/').should(() => {
      expect(localStorage.getItem('accessToken')).to.includes('')
    })
  })
})