const moment = require("moment");
const conexao = require("../infraestrutura/conexao");

class Atendimento {
  adiciona(atendimento, resp) {
    const sql = "INSERT INTO Atendimentos SET ?";

    const dataCriacao = new Date();
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );

    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteEhValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: "data",
        mensagem: "Data deve ser maior ou igual a data atual",
        valido: dataEhValida,
      },
      {
        nome: "cliente",
        mensagem: "Cliente deve ter pelo menos cinco caracteres.",
        valido: clienteEhValido,
      },
    ];

    const erros = validacoes.filter((item) => !item.valido);
    const existemErros = erros.length;

    if (existemErros) {
      resp.status(400).json(erros);
    } else {
      const atendimentoDatado = { ...atendimento, data, dataCriacao };

      conexao.query(sql, atendimentoDatado, (erro, resultados) => {
        if (erro) {
          resp.status(400).json(erro);
        } else {
          resp.status(201).json(resultados);
        }
      });
    }
  }
}

module.exports = new Atendimento();
