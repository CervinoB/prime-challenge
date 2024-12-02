import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import listClientApi from "../../support/api/listClientApi";

When("teste de resposta bem-sucedida", () => {
  listClientApi.getClientsListAndAssert200();
});

Then("teste validação dos campos", () => {
  listClientApi.getClientListAndValidateStructure();
});

Then("teste validação de endpoint", () => {
  listClientApi.getClientsListAndAssert404();
});

When("teste de adição bem-sucedida", () => {
  // listClientApi.addClientSuccefully();
});

Then("teste de campos obrigatórios", () => {
  listClientApi.addClientWithMissingFields();
});

Then("teste de validação do e-mail e URL do perfil", () => {
  listClientApi.addClientWithInvalidField(
    "email",
    "invalidemail",
    "E-mail em formato inválido."
  );
  listClientApi.addClientWithInvalidField(
    "fotoPerfil",
    "invalid-url",
    "URL incorreta."
  );
});

When("teste de exclusão bem-sucedida", () => {
  listClientApi.addClientSuccefully().then((id) => {
    listClientApi.deleteClient(id);
  });
});

Then("teste de cliente não encontrado", () => {
  listClientApi.deleteClient("21312");
});

Then("teste de exclusão sem ID", () => {
  listClientApi.deleteClient("")
});

Then("teste de cliente não encontrado",()=>{

});

Then("teste de exclusão sem ID",()=>{
  
});