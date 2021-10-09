/// <reference types="cypress" />

const serverUrl = 'http://localhost:5000'
import { userLogin, userLogout } from '../../src/reducers/user'
const dispatch = action => cy.window().its('__store__').invoke('dispatch', action)
const getState = () => cy.window().its('__store__').invoke('getState')

const boardTitle = 'Board Testing Cypress'

describe('Boards features', () => {
  beforeEach(function () {
    cy.request(`${serverUrl}/test/reset-seed`)

    const username = 'demo', password = 'reactdemo'
    cy.request('POST', `${serverUrl}/auth/login`, { username, password })
      .its('body')
      .as('currentUser')
      .then((body) => {
        cy.visit('/')
        dispatch(userLogin(body))
      })
  })

  it('can add new board', function () {
    cy.visit('/')
    cy.contains('button', 'create board', { matchCase: false }).click()
    cy.contains('h2', 'Add board title')
    cy.get('input[name="title"]').type(boardTitle)
    cy.contains('button[type="submit"]', 'Create board').click({ force: true })

    cy.location('pathname').should('match', /\/boards\/(.+)/)
    cy.contains('button', boardTitle)
    cy.contains('button', 'Disable edit by public')
    cy.contains('button', 'Add a list')
  })

  it('can view all boards created', function () {
    cy.request({
      method: 'POST',
      url: `${serverUrl}/boards`,
      headers: {
        authorization: this.currentUser.accessToken,
      },
      body: { title: boardTitle },
    })
    cy.request({
      method: 'POST',
      url: `${serverUrl}/boards`,
      headers: {
        authorization: this.currentUser.accessToken,
      },
      body: { title: boardTitle + '2' },
    })

    cy.visit('/')
    cy.get('[data-cy="board-single"]')
      .should('have.length', 2)

    cy.get('[data-cy="board-single"]').contains('p', new RegExp(`^${boardTitle}$`))
    cy.get('[data-cy="board-single"]').contains('p', new RegExp(`^${boardTitle}2$`))
  })

  it('can edit board title', function () {
    const newTitle = boardTitle + ' new'
    cy.request({
      method: 'POST',
      url: `${serverUrl}/boards`,
      headers: {
        authorization: this.currentUser.accessToken,
      },
      body: { title: boardTitle },
    })

    cy.visit('/')

    cy.contains('[data-cy="board-single"]', new RegExp(`^${boardTitle}$`))
      .find('[data-cy="board-single-menu"]')
      .click()

    cy.contains('button', 'Edit')
      .click()

    cy.get('input[name="title"]')
      .invoke('val')
      .should('eq', boardTitle)

    cy.get('input[name="title"]')
      .clear()
      .type(`${newTitle}{enter}`)

    cy.get('[data-cy="board-single"]')
      .should('have.length', 1)
    cy.contains('[data-cy="board-single"]', new RegExp(`^${newTitle}$`))
  })

  it('can delete board', function () {
    cy.request({
      method: 'POST',
      url: `${serverUrl}/boards`,
      headers: {
        authorization: this.currentUser.accessToken,
      },
      body: { title: boardTitle },
    })

    cy.visit('/')

    cy.contains('[data-cy="board-single"]', new RegExp(`^${boardTitle}$`))
      .find('[data-cy="board-single-menu"]')
      .click()

    cy.contains('button', 'Delete')
      .click()

    cy.get('[data-cy="board-title-delete"]').should('contain.text', boardTitle)

    cy.contains('button[type="submit"]', /^confirm$/i)
      .click()

    cy.get('[data-cy="board-single"]')
      .should('have.length', 0)
  })
})