/* eslint-disable no-undef */
describe("Register a new user", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should register a user successfully", () => {
    cy.get('[data-testid="name"]').type("João Silva");
    cy.get('[data-testid="email"]').type("joaosilva@example.com");
    cy.get('[data-testid="cpf"]').type("12345678901");
    cy.get('[data-testid="password"]').type("0123456");
    cy.get('[data-testid="register-button"]').click();

    // Verifica se a mensagem de sucesso aparece
    cy.contains("Usuário registrado com sucesso").should("be.visible");

    // Verifica redirecionamento para a página de login
    cy.url().should("include", "/login");
  });
});
