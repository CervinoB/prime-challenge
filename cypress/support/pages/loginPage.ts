/// <reference types="cypress" />
import data from "../data";

const login = {
  inputEmail: 'input[type="email"]',
  inputPassword: 'input[type="password"]',
  buttonSubmitForm: "form > button",

  fillEmailAndPassword({
    email = data.defaultEmail,
    password = data.defaultPassword,
  }: { email?: string; password?: string } = {}) {
    cy.get(login.inputEmail).clear().type(email);
    cy.get(login.inputPassword).clear().type(password);
  },

  submitForm() {
    cy.get(login.buttonSubmitForm).click({ force: true });
  },

  alertEmailAlreadyExists() {
    cy.get('div[role="alert"]').should(
      "have.text",
      "Esse email já está em uso por outra conta"
    );
  },

  alertWrongPassword() {
    cy.get('div[role="alert"]').should(
      "have.text",
      "E-mail ou senha inválida."
    );
  },

  interceptSignupRequest() {
    cy.intercept(
      "POST",
      /https:\/\/www.googleapis.com\/identitytoolkit\/v3\/relyingparty\/signupNewUser\?key=.*/
    ).as("signupNewUser");
  },

  verifySignupResponse() {
    cy.wait("@signupNewUser").its("response.statusCode").should("eq", 200);
  },

  interceptSigninRequest() {
    cy.intercept(
      "POST",
      /https:\/\/www.googleapis.com\/identitytoolkit\/v3\/relyingparty\/verifyPassword\?key=.*/
    ).as("signinUser");
  },

  verifySigninResponse() {
    cy.wait("@signinUser").its("response.statusCode").should("eq", 200);
  },

  verifySignupResponseEmailAlreadyExists() {
    cy.wait("@signupNewUser").then((interception) => {
      expect(interception.response?.statusCode).to.eq(400);
      expect(interception.response?.body.error.message).to.eq("EMAIL_EXISTS");
    });
  },

  verifySigninResponseWrongPassword() {
    cy.wait("@signinUser").then((interception) => {
      expect(interception.response?.statusCode).to.eq(400);
      expect(interception.response?.body.error.message).to.eq(
        "INVALID_PASSWORD"
      );
    });
  },

  verifyCreateAccountPage() {
    cy.get("h1").should("have.text", "Criar Conta");
  },

  verifyLoginPage() {
    cy.get("h1").should("have.text", "Login");
  },

  loginFillAndSubmit() {
    login.fillEmailAndPassword();
    login.interceptSigninRequest();
    login.submitForm();
    login.verifySigninResponse();
  },
};

export default { ...login };
