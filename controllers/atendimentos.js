const Atendimentos = require("../models/atendimentos");

module.exports = (app) => {
  app.get("/", (req, res) => res.send("servidor rodando, tudo ok!"));

  app.post("/atendimento", (req, resp) => {
    const atendimento = req.body;

    Atendimentos.adiciona(atendimento);
    resp.send("Você esta na rota de atendimento realizando um POST");
  });
};
