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
          resp.status(201).json(atendimento);
        }
      });
    }
  }

  lista(resp) {
    const sql = "SELECT * FROM Atendimentos";

    conexao.query(sql, (erro, resultado) => {
      if (erro) {
        resp.status(400).json(erro);
      } else {
        resp.status(200).json(resultado);
      }
    });
  }

  buscaPorId(id, resp) {
    const sql = `SELECT * FROM Atendimentos WHERE id =${id}`;

    conexao.query(sql, (erro, resultado) => {
      if (erro) {
        resp.status(400).json(erro);
      } else {
        const atendimento = resultado[0];
        resp.status(200).json(atendimento);
      }
    });
  }

  altera(id, valores, resp) {
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }
    const sql = "UPDATE Atendimentos SET ? WHERE id = ?";

    conexao.query(sql, [valores, id], (erro, resultado) => {
      if (erro) {
        resp.status(400).json(erro);
      } else {
        resp.status(200).json({ ...valores, id });
      }
    });
  }

  deleta(id, resp) {
    const sql = "DELETE FROM Atendimentos WHERE id = ?";

    conexao.query(sql, id, (erro, resultado) => {
      if (erro) {
        resp.status(400).json(erro);
      } else {
        resp.status(200).json({ id });
      }
    });
  }
}

module.exports = new Atendimento();
