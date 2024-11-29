/// <reference types="cypress" />
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import generateData from "../../support/utils/generateData";
import login from "../../support/pages/loginPage";
import home from "../../support/pages/homePage";
import data from "../../support/data";

const randomId: number = generateData.generateRandomId();
const password: string = data.defaultPassword;
const email: string = `jcervinobarbosa+prime.challenge${randomId}@gmail.com`;

When("eu tento criar uma nova conta com um email válido", () => {
  home.visitHomePage();

  home.navigateToCreateAccount();
  login.verifyCreateAccountPage();

  login.fillEmailAndPassword(email, password);
  login.interceptSignupRequest();
  login.submitForm();
});

Then(
  "eu devo ver uma mensagem de sucesso indicando que a conta foi criada",
  () => {
    login.verifySignupResponse();
  }
);

When("eu tento criar uma nova conta com um email já cadastrado", () => {
  home.visitHomePage();

  home.navigateToCreateAccount();
  login.verifyCreateAccountPage();

  login.fillEmailAndPassword(data.defaultEmail, password);
  login.interceptSignupRequest();
  login.submitForm();
});

Then(
  "eu devo ver uma mensagem de erro indicando que o email já está em uso",
  () => {
    login.verifySignupResponseEmailAlreadyExists();
    login.alertEmailAlreadyExists();
  }
);

When("eu insiro credenciais de login válidas", () => {
  home.visitHomePage();

  home.navigateToLogin();
  login.verifyLoginPage();

  login.fillEmailAndPassword(data.defaultEmail, password);
  login.interceptSigninRequest();
  login.submitForm();
});

Then("eu devo ser logado com sucesso", () => {
  login.verifySigninResponse();
});

When("eu insiro uma senha inválida", () => {
    home.visitHomePage();

    home.navigateToLogin();
    login.verifyLoginPage();

    login.fillEmailAndPassword(data.defaultEmail, "123456");
    login.interceptSigninRequest();
    login.submitForm();

    cy.wait("@signinUser")
});

Then(
  "eu devo ver uma mensagem de erro indicando que a senha está incorreta",
  () => {}
);
