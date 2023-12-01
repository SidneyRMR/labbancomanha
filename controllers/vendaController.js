const Usuario = require("../model/usuario");
const Venda = require("../model/venda");
const Festa = require("../model/festa");

exports.create = (req, res, next) => {
  const debito = req.body.debito;
  const credito = req.body.credito;
  const pix = req.body.pix;
  const dinheiro = req.body.dinheiro;
  const caixaId = req.body.caixaId;
  const usuarioId = req.body.usuarioId;
  const festaId = req.body.festaId;

  // console.log(debito, credito);

  if (
    debito === undefined ||
    credito === undefined ||
    pix === undefined ||
    dinheiro === undefined ||
    caixaId === undefined ||
    usuarioId === undefined ||
    festaId === undefined
  ) {
    res.status(400).json({
      mensagem: "Campos não definidos",
    });
  } else {
    Venda.create({
      debito: debito,
      credito: credito,
      pix: pix,
      dinheiro: dinheiro,
      caixaId: caixaId,
      usuarioId: usuarioId,
      festaId: festaId,
    })
      .then((vendaCriado) => {
        res.status(201).json({
          mensagem: "Venda criada",
          venda: vendaCriado,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          mensagem: "Erro na criação da venda!",
          erro: err,
        });
      });
  }
};

exports.update = (req, res, next) => {
  const id = req.params.id;
  const debito = req.body.debito;
  const credito = req.body.credito;
  const pix = req.body.pix;
  const dinheiro = req.body.dinheiro;
  const caixaId = req.body.caixaId;
  const usuarioId = req.body.usuarioId;
  const festaId = req.body.festaId;

  Venda.update(
    {
      debito: debito,
      credito: credito,
      pix: pix,
      dinheiro: dinheiro,
      caixaId: caixaId,
      usuarioId: usuarioId,
      festaId: festaId,
    },
    {
      where: {
        id: id,
      },
    }
  ).then((resultado) => {
    res.status(201).json({
      mensagem: "Venda alterada",
    });
  });
};

exports.getAll = (req, res, next) => {
  Venda.findAll({
    order: [["festaId", "DESC"]],
    order: [["createdAt", "DESC"]],
  }).then((venda) => {
    if (!vendas) {
      return res.status(404).json({
        mensagem: "Nenhum venda encontrada para esta festa.",
        vendas: [],
      });
    }
    res.status(200).json({
      mensagem: "Vendas encontradas",
      venda: venda,
    });
  });
};

exports.getAllByFesta = (req, res, next) => {
  const festaId = +req.params.festaId; // Obtenha o ID da festa a partir dos parâmetros da URL
  // console.log(festaId);
  Venda.findAll({
    where: {
      festaId: festaId, // Filtra por festaId igual ao ID da festa
    },
    include: [
    {
      model: Festa,
      attributes: ["nome"], // Especifique as colunas da tabela Festa que você deseja incluir
    }, {
      model: Usuario,
      attributes: ["nome"], // Especifique as colunas da tabela Festa que você deseja incluir
    },
  ],
    order: [["createdAt", "DESC"]],
    attributes: [
      "id",
      "debito",
      "credito",
      "pix",
      "dinheiro",
      "caixaId",
      "usuarioId",
      "festaId",
    ],
  }).then((vendas) => {
    if (!vendas) {
      return res.status(404).json({
        mensagem: "Nenhum venda encontrada para esta festa.",
        vendas: [],
      });
    }

    console.log("vendas", vendas);
    const vendasComNomesDeUsuarios = vendas.map((venda) => ({
      id: venda.id,
      debito: venda.debito,
      credito: venda.credito,
      pix: venda.pix,
      dinheiro: venda.dinheiro,
      // usuarioId: venda.usuarioId,
      caixaId: venda.caixaId,
      // festaId: venda.festaId,
      festaNome: venda.festum.nome, // Obtenha o nome da festa a partir do join
      usuarioNome: venda.usuario.nome, // Obtenha o nome da festa a partir do join
    }));
    //   console.log(vendasComNomesDeUsuarios);
    res.status(200).json({
      mensagem: "Vendas encontradas",
      vendas: vendasComNomesDeUsuarios,
    });
  });
};

exports.getAllByUsuario = (req, res, next) => {
  const usuarioId = +req.params.usuarioId; // Obtenha o ID da festa a partir dos parâmetros da URL
  // console.log(usuarioId);
  Venda.findAll({
    where: {
      usuarioId: usuarioId, // Filtra por usuarioId igual ao ID da festa
    },
    include: [
    {
      model: Festa,
      attributes: ["nome"], // Especifique as colunas da tabela Festa que você deseja incluir
    }, {
      model: Usuario,
      attributes: ["nome"], // Especifique as colunas da tabela Festa que você deseja incluir
    },
  ],
    order: [["createdAt", "DESC"]],
    attributes: [
      "id",
      "debito",
      "credito",
      "pix",
      "dinheiro",
      "caixaId",
      "usuarioId",
      "festaId",
    ],
  }).then((vendas) => {
    if (!vendas) {
      return res.status(404).json({
        mensagem: "Nenhum venda encontrada para esta festa.",
        vendas: [],
      });
    }

    console.log("vendas", vendas);
    const vendasComNomesDeUsuarios = vendas.map((venda) => ({
      id: venda.id,
      debito: venda.debito,
      credito: venda.credito,
      pix: venda.pix,
      dinheiro: venda.dinheiro,
      usuarioId: venda.usuarioId,
      caixaId: venda.caixaId,
      // festaId: venda.festaId,
      festaNome: venda.festum.nome, // Obtenha o nome da festa a partir do join
      usuarioNome: venda.usuario.nome, // Obtenha o nome da festa a partir do join
    }));
    //   console.log(vendasComNomesDeUsuarios);
    res.status(200).json({
      mensagem: "Vendas encontradas",
      vendas: vendasComNomesDeUsuarios,
    });
  });
};

// nao esta sendo usado ainda, precisa de ajustes
// exports.getAllByUsuario = (req, res, next) => {
//   const usuarioId = +req.params.usuarioId; // Obtenha o ID da festa a partir dos parâmetros da URL
//   console.log("idUsuario", usuarioId);
//   Venda.findAll({
//     where: {
//       usuarioId: usuarioId, // Filtra por festaId igual ao ID da festa
//     },
//     include: [{
//       model: Festa,
//       attributes: ["nome"], // Especifique as colunas da tabela Festa que você deseja incluir
//     },
//     {
//       model: Usuario,
//       attributes: ["nome"], // Especifique as colunas da tabela Festa que você deseja incluir
//     },
//     ],
//     order: [["createdAt", "DESC"]],
//     attributes: [
//       "id",
//       "dinheiro",
//       "debito",
//       "credito",
//       "pix",
//       "caixaId",
//       "usuarioId",
//       "festaId",
//     ],
//   }).then((vendas) => {
//     if (!vendas) {
//       return res.status(404).json({
//         mensagem: "Nenhum venda encontrada para esta festa.",
//         vendas: [],
//       });
//     }
//     console.log("vendas", vendas);
//     const vendasComNomesDeUsuarios = vendas.map((venda) => ({
//       id: venda.id,
//       debito: venda.debito,
//       credito: venda.credito,
//       pix: venda.pix,
//       dinheiro: venda.dinheiro,
//       caixaId: venda.caixaId,
//       // usuarioId: venda.usuarioId,
//       // festaId: venda.festaId,
//       // festaNome: venda.festum.nome, // Obtenha o nome da festa a partir do join
//       // usuarioNome: venda.usuario.nome, // Obtenha o nome da festa a partir do join
//     }));
//     console.log(vendasComNomesDeUsuarios);
//     res.status(200).json({
//       mensagem: "Vendas encontradas",
//       vendas: vendasComNomesDeUsuarios,
//     });
//   });
// };

exports.getOne = (req, res, next) => {
  const id = req.params.id;

  Venda.findOne({
    where: {
      id: id,
    },
  }).then((venda) => {
    res.status(200).json({
      mensagem: "Venda encontrada",
      venda: venda,
    });
  });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Venda.destroy({
    where: {
      id: id,
    },
  }).then((resultado) => {
    res.status(200).json({
      mensagem: "Venda excluída",
    });
  });
};
