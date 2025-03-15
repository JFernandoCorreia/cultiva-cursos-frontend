/* eslint-disable no-undef */
describe("Navbar mobile functionality", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit("/");
  });

  it("Should toggle the hamburger menu", () => {
    cy.get('[data-testid="hamburger-button"]').should("exist").click();
    cy.contains("Login de Funcionário").should("be.visible");

    // Fecha o menu e verifica se está oculto
    cy.get('[data-testid="hamburger-button"]').click();
    cy.contains("Login de Funcionário").should("not.be.visible");
  });
});
