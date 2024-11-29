import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import listClientApi from "../../support/api/listClientApi";
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);

When("eu consulto o ep de listagem de clientes", () => {
  listClientApi.getClientsList();
});

Then("eu valido a estrutura dos campos",()=>{

});
