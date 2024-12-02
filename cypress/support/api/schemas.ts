const listClientsSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    nome: {
      type: "string",
    },
    email: {
      type: "string",
    },
    fone: {
      type: "string",
    },
    fotoPerfil: {
      type: "string",
      format: "uri",
    },
  },
  required: ["id", "nome", "email", "fone", "fotoPerfil"],
};

export default { listClientsSchema };
