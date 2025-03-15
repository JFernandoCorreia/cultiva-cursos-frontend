/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */
describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login-usuario");
  });

  it("Deve logar um usuário com sucesso", () => {
    cy.intercept("POST", "/api/auth/login", {
      statusCode: 200,
      body: { token: "fakeToken123" },
    }).as("loginRequest");

    cy.get('[data-testid="email"]').type("seu_email@example.com");
    cy.get('[data-testid="password"]').type("sua_senha");
    cy.get('[data-testid="login-button"]').click();

    cy.wait("@loginRequest");
    cy.url().should("include", "/");
  });

  it("Deve exibir mensagem de erro ao tentar logar com credenciais inválidas", () => {
    cy.intercept("POST", "/api/auth/login", {
      statusCode: 401,
      body: { error: "Credenciais inválidas" },
    }).as("loginError");

    cy.get('[data-testid="email"]').type("email_invalido@example.com");
    cy.get('[data-testid="password"]').type("senha_invalida");
    cy.get('[data-testid="login-button"]').click();

    cy.wait("@loginError");
    cy.contains("Erro ao fazer login").should("be.visible");
  });
});
