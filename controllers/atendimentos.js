const Atendimentos = require("../models/atendimentos");

module.exports = (app) => {
  app.get("/", (req, res) => res.send("servidor rodando, tudo ok!"));

  app.post("/atendimento", (req, resp) => {
    const atendimento = req.body;

    Atendimentos.adiciona(atendimento, resp);
  });

  app.get("/atendimentos", (req, resp) => {
    Atendimentos.lista(resp);
  });

  app.get("/atendimento/:id", (req, resp) => {
    const id = parseInt(req.params.id);

    Atendimentos.buscaPorId(id, resp);
  });

  app.patch("/atendimento/:id", (req, resp) => {
    const id = parseInt(req.params.id);
    const valores = req.body;

    Atendimentos.altera(id, valores, resp);
  });

  app.delete("/atendimento/:id", (req, resp) => {
    const id = parseInt(req.params.id);

    Atendimentos.deleta(id, resp);
  });
};
