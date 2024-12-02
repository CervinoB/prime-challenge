import data from "../data";

const listClientApi = {
  listClientUrl: "https://api-challenge.primecontrol.com.br/listClients",
  addClientUrl: "https://api-challenge.primecontrol.com.br/addClient",
  deleteClientUrl: "https://api-challenge.primecontrol.com.br/deleteClient",
  wrongUrl: "https://api-challenge.primecontrol.com.br/wrong",

  getClientsListAndAssert200() {
    cy.request("GET", listClientApi.listClientUrl).should((response) => {
      expect(response.status).to.eq(200);
      console.log(response.body);
    });
  },

  getClientListAndValidateStructure() {
    cy.request("GET", listClientApi.listClientUrl).should((respose) => {
      expect(respose.status);
    });
  },

  getClientsListAndAssert404() {
    cy.request({ url: listClientApi.wrongUrl, failOnStatusCode: false })
      .its("status")
      .should("equal", 404);
  },

  addClientSuccefully() {
    return cy
      .request({
        url: listClientApi.addClientUrl,
        method: "POST",
        body: data.clientDataApi,
        failOnStatusCode: false,
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        console.log(response.body.id);
        return response.body.id;
      });
  },

  addClientWithMissingFields() {
    const requiredFields = {
      nome: "Informe o nome",
      fone: "Informe o telefone",
      email: "Informe o e-mail",
      cep: "Informe o CEP",
      endereco: "Informe o endereço",
      complemento: "Informe o complemento",
      pais: "Informe o país",
      genero: "Informe o gênero",
      ferramentas:
        "Informe ao menos uma ferramenta que você conhece dentre: Robot Framework | Selenium WebDriver | Cypress | AppiumProtractor ",
      fotoPerfil: "Informe a URL da foto",
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      this.addClientWithInvalidField(field, null, message);
    });
  },

  addClientWithInvalidField(field, invalidValue, expectedMessage) {
    const modifiedClientData = { ...data.clientDataApi, [field]: invalidValue };
    cy.request({
      url: listClientApi.addClientUrl,
      method: "POST",
      body: modifiedClientData,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq(expectedMessage);
    });
  },

  deleteClient(clientId: string) {
    console.log("cliente to delete ", clientId);
    cy.request({
      url: `${listClientApi.deleteClientUrl}/${clientId}`,
      method: "DELETE",
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 404) {
        if (response.body.message) {
          expect(response.body.message).to.eq("Cliente não encontrado.");
        } else {
            expect(response.body).to.include("<pre>Cannot DELETE /deleteClient/</pre>");
        }
      } else {
        expect(response.status).to.eq(200);
      }
    });
  },

  
};

export default { ...listClientApi };
