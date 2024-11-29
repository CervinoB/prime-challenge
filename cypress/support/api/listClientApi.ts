import schemas from '../api/schemas';
import chaiJsonSchema from "chai-json-schema";


const listClientApi = {
  listClientUrl: "https://api-challenge.primecontrol.com.br/listClients",

  getClientsList() {
    cy.request({
      method: "GET",
      url: listClientApi.listClientUrl,
    }).then((response) => {
      expect(response.status).to.eq(200);
            cy.wrap(response.body).chaiJsonSchema(
              "matchSchema",
              schemas.listClientsSchema
            );

    });
  },
};

export default { ...listClientApi };
