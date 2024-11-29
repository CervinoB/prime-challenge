import "cypress-file-upload";

const client = {
  searchInput: 'input[placeholder="Pesquisar por nome"]',
  searchButton: "#button-addon2",

  verifyClientPage() {
    cy.get("h1").should("have.text", "Gestão de Clientes");
  },

  navigateToClientRegister() {
    cy.get("a").contains("Cadastrar Cliente").click();
  },

  searchName(name: string) {
    cy.get(client.searchInput).clear().type(name);
    cy.wait(999);

    cy.get(client.searchButton).click();
  },

  verifyModal(clientData: { name: string; email: string; phone: string }) {
    cy.get(".modal-content-cliente").should("be.visible");

    cy.get("h2").should("have.text", "Dados do Cliente");

    cy.get(".dados_cliente")
      .children()
      .then(() => {
        cy.get("p").eq(0).should("have.text", `Nome: ${clientData.name}`);
        cy.get("p").eq(1).should("have.text", `E-mail: ${clientData.email}`);
        cy.get("p").eq(2).should("have.text", `Telefone: ${clientData.phone}`);
      });
  },

  fillClientForm(clientData: {
    name: string;
    phone: string;
    email: string;
    cep: string;
    houseNumber: string;
    address: string;
    complement: string;
    country: string;
    gender: string;
    tools: string;
    image: string;
  }) {
    cy.get('.perfil-form input[type="text"]').first().type(clientData.name);
    cy.get('.perfil-form input[type="tel"]').type(clientData.phone);
    cy.get('.perfil-form input[type="email"]').type(clientData.email);
    cy.get('.perfil-form input[pattern="[0-9]{5}-[0-9]{3}"]').type(
      clientData.cep
    );
    cy.get('.perfil-form input[pattern="[0-9]+"]')
      .last()
      .type(clientData.houseNumber);
    cy.get(".perfil-form label")
      .contains("Endereço")
      .siblings('input[type="text"]')
      .type(clientData.address);
    cy.get(".perfil-form label")
      .contains("Complemento")
      .siblings('input[type="text"]')
      .type(clientData.complement);

    cy.get(".perfil-form select").select(clientData.country);
    cy.get(".perfil-form label").contains(clientData.gender).click();

    cy.get(".perfil-form label").contains(clientData.tools).click();

    cy.get(".image-upload-label").selectFile(clientData.image, { force: true });
  },

  submitForm() {
    cy.get(".perfil-form button.salvar").click();
  },

  getTableData() {
    return cy
      .get("tbody", { timeout: 8000 })
      .children()
      .then((rows) => {
        const tableData: string[][] = [];
        Cypress._.each(rows, (row) => {
          const rowData: string[] = [];
          cy.wrap(row)
            .children()
            .not(":last-child")
            .each((col) => {
              cy.wrap(col)
                .invoke("text")
                .then((text) => {
                  rowData.push(text.trim());
                });
            })
            .then(() => {
              tableData.push(rowData);
            });
        });
        return cy.wrap(tableData);
      });
  },

  clickEditButton(rowIndex: number) {
    cy.get("tbody tr").eq(rowIndex).find(".fa-edit").parent().click();
  },

  getEditFormData() {
    cy.get("form")
      .children()
      .then((elm) => {
        cy.wrap(elm.eq(1))
          .find("input")
          .should("have.attr", "value", "João Cervino")
          .should("be.visible");

        cy.wrap(elm.eq(2))
          .find("input")
          .should("have.attr", "value", "jcervinobarbosa@gmail.com")
          .should("be.visible");

        cy.wrap(elm.eq(3))
          .find("input")
          .should("have.attr", "value", "61995872927")
          .should("be.visible");
      });
  },

  verifyIsInEditPage() {
    cy.get("h1").should("have.text", "Editar Cliente");
    client.getEditFormData();
  },

  editClientInformation() {
    cy.get("form")
      .children()
      .then((elm) => {
        cy.wrap(elm.eq(1)).find("input").clear().type("Carlos Nu Sertão");

        cy.wrap(elm.eq(2))
          .find("input")
          .clear()
          .type("jcervinobarbosa+mudança.cliente@gmail.com");

        cy.wrap(elm.eq(3)).find("input").clear().type("4691453486");
      });
  },
  verifyDisabledButton(){
    cy.get(".perfil-form button.salvar").should("be.disabled");
  }
};

export default { ...client };
