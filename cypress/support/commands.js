Cypress.Commands.add('getBySel', value => {
  cy.get(`[data-cy=${value}]`);
});
