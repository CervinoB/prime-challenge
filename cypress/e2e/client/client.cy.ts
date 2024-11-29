import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import home from "../../support/pages/homePage";
import login from "../../support/pages/loginPage";
import data from "../../support/data";
import client from "../../support/pages/clientPage";

When("navego para a página de login atraves da home", () => {
  home.visitHomePage();
  home.navigateToLogin();
});

Then("preencho os dados e logo com sucesso na plataforma", () => {
  login.loginFillAndSubmit();
  client.verifyClientPage();
});

When(
  "eu insiro todas as informações necessárias e válidas para cadastrar um cliente",
  () => {
    client.navigateToClientRegister();
    client.fillClientForm(data.clientData);
    client.submitForm();
  }
);

Then("o cliente deve ser cadastrado com sucesso", () => {
  client.getTableData().then((tableData) => {
    const clientExists = tableData.some(
      (row) =>
        row[1] === data.clientData.name &&
        row[2] === data.clientData.email &&
        row[3] === data.clientData.phone
    );
    expect(clientExists).to.be.true;
  });
});

When("eu realizo a pesquisa pelo nome ou email do cliente na listagem", () => {
  client.searchName(data.clientData.name);
});

Then(
  "os dados completos do cliente devem ser exibidos corretamente na tela",
  () => {
    client.verifyModal({
      name: data.clientData.name,
      email: data.clientData.email,
      phone: data.clientData.phone,
    });
  }
);

When("eu clico no botão de editar para esse cliente", () => {
  client.getTableData().then((tableData) => {
    const rowIndex = tableData.findIndex(
      (row) => row[2] === data.clientData.email
    );
    if (rowIndex !== -1) {
      client.clickEditButton(rowIndex);
    } else {
      throw new Error("No editable client found with the specified email");
    }
  });

  client.verifyIsInEditPage();
});

When("eu altero informações válidas do cliente", () => {
  client.editClientInformation();
});

Then("as alterações devem ser salvas com sucesso", () => {
  cy.get("button").contains("Excluir Foto").click();
  cy.get("button").contains("Salvar").click();
});

When(
  "eu tento cadastrar um cliente com um email inválido e sem preencher os campos obrigatórios",
  () => {
    client.navigateToClientRegister();
    client.fillClientForm(data.invalidClientData);
    cy.get('.perfil-form input[type="tel"]').clear();
  }
);

Then(
  "eu devo ver uma mensagem de erro indicando que o email é inválido e falta de campos preenchidos",
  () => {
    client.verifyDisabledButton();
  }
);
