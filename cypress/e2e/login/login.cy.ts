import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import generateData from "../../support/utils/generateData";
import login from "../../support/pages/loginPage";
import home from "../../support/pages/homePage";
import data from "../../support/data";

const randomId: number = generateData.generateRandomId();
const email: string = `jcervinobarbosa+prime.challenge${randomId}@gmail.com`;

When("eu tento criar uma nova conta com um email válido", () => {
  home.visitHomePage();

  home.navigateToCreateAccount();
  login.verifyCreateAccountPage();

  login.fillEmailAndPassword({ email: email });
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

  login.fillEmailAndPassword();
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

  login.fillEmailAndPassword();
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

  login.fillEmailAndPassword({ password: "123456" });
  login.interceptSigninRequest();
  login.submitForm();
});

Then(
  "eu devo ver uma mensagem de erro indicando que a senha está incorreta",
  () => {
    login.verifySigninResponseWrongPassword();
    login.alertWrongPassword();
  }
);

When("eu clico em “Finalizar” para realizar logout", () => {
  home.visitHomePage();
  home.navigateToLogin();
  login.loginFillAndSubmit();

  cy.get("a").contains("Finalizar").click({ force: true });

  cy.get("button").contains("Logout").click();
});

Then("eu devo ser deslogado com sucesso", () => {
  login.verifyLoginPage();
});

When("eu tento recuperar minha senha de acesso", () => {
  home.visitHomePage();
  home.navigateToLogin();
  cy.get('a[href="/app/resetsenha"]').click();

  cy.get("h1").should("have.text", "Recuperar Senha");
  cy.get("#floatingInput").type(data.defaultEmail);
});

Then(
  "eu devo receber um email com instruções para redefinir minha senha",
  () => {
    cy.intercept(
      "POST",
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=**"
    ).as("resetConfirmationCode");
    cy.get("button").contains("Enviar").click();
    cy.wait("@resetConfirmationCode")
      .its("response.statusCode")
      .should("eq", 200);
    cy.get('div[role="alert"]').should(
      "have.text",
      "Email enviado com sucesso"
    );
  }
);

When(
  "eu preencho as Informações do Candidato e clico em Finalizar e Enviar",
  () => {
    home.visitHomePage();
    home.navigateToLogin();
    login.loginFillAndSubmit();

    cy.get("a").contains("Finalizar").click({ force: true });

    cy.get("button").contains("Enviar").click();
    cy.get("#nome").type("João Pedro Cervino Barbosa");
    cy.get("#telefone").type("61995872927");
    cy.get("#email").clear().type("jcervinobarbosa@gmail.com");
    cy.get("#githubLink").type("https://github.com/CervinoB/prime-challenge");
    cy.get("#nomeRecrutador").type("Kelly Garcia");
    cy.get("button").contains("Salvar").click();
  }
);

Then(
  "eu devo ver uma mensagem de confirmação indicando que as informações foram enviadas com sucesso",
  () => {
    cy.get(".alert").contains("As informações foram registradas com sucesso!");
  })
