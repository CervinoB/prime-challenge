const data = {
  defaultEmail: "jcervinobarbosa+prime.challenge@gmail.com",
  defaultPassword: "Teste12#",
  clientData: {
    name: "João Cervino",
    phone: "61995872927",
    email: "jcervinobarbosa@gmail.com",
    cep: "85660-000",
    houseNumber: "164",
    address: "Rua Ipiranga, Centro Norte, Dois Vizinhos - Pr",
    complement: "Apto 107",
    country: "Brasil",
    gender: "Masculino",
    tools: "Cypress",
    image: "cypress/fixtures/images/joaoPedro.jpg",
  },
  invalidClientData: {
    name: "João Cervino",
    phone: "61995872927",
    email: "Joaozinho.com",
    cep: "85660-000",
    houseNumber: "164",
    address: "Rua Ipiranga, Centro Norte, Dois Vizinhos - Pr",
    complement: "Apto 107",
    country: "Brasil",
    gender: "Masculino",
    tools: "Cypress",
    image: "cypress/fixtures/images/joaoPedro.jpg",
  },
};

export default { ...data };
