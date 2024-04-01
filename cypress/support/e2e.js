// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.Commands.add("visitWithRetry", (url, retries = 0) => {
  if (retries > 3) {
    throw new Error("Max retries reached");
  }

  return cy
    .request({
      url,
      failOnStatusCode: false,
    })
    .then((response) => {
      if (response.status === 429) {
        cy.wait(2000); // Wait for 2 seconds
        return cy.visitWithRetry(url, retries + 1);
      } else if (response.status === 404) {
        throw new Error(`Page not found: ${url}`);
      }

      cy.visit(url);
    });
});
