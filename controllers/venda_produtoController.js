const Venda_produto = require("../model/venda_produto");
const Usuario = require("../model/usuario");

exports.create = (req, res, next) => {
  const nome = req.body.nome;
  const medida = req.body.medida;
  const preco = req.body.preco;
  const qtde_venda_produtos = req.body.qtde_venda_produtos;
  const produtoId = req.body.produtoId;
  const vendaId = req.body.vendaId;
  const usuarioId = req.body.usuarioId;

  // console.log(nome, medida);

  if (
    nome === undefined ||
    medida === undefined ||
    preco === undefined ||
    qtde_venda_produtos === undefined ||
    produtoId === undefined ||
    vendaId === undefined ||
    usuarioId === undefined
  ) {
    res.status(400).json({
      mensagem: "Campos não definidos",
    });
  } else {
    Venda_produto.findOne({
      where: {
        nome: nome,
        medida: medida,
        preco: preco,
        qtde_venda_produtos: qtde_venda_produtos,
        produtoId: produtoId,
        vendaId: vendaId,
        usuarioId: usuarioId,
      },
    }).then((venda_produto) => {
      if (venda_produto == undefined) {
        Venda_produto.create({
          nome: nome,
          medida: medida,
          preco: preco,
          qtde_venda_produtos: qtde_venda_produtos,
          produtoId: produtoId,
          vendaId: vendaId,
          usuarioId: usuarioId,
        })
          .then((venda_produtoCriado) => {
            res.status(201).json({
              mensagem: "Venda de produto criada",
              venda_produto: venda_produtoCriado,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              mensagem: "Erro na criação da venda do produto!",
              erro: err,
            });
          });
      } else {
        res.status(401).json({
          mensagem: "Venda deste produto já existe",
        });
      }
    });
  }
};

exports.update = (req, res, next) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const medida = req.body.medida;
  const preco = req.body.preco;
  const qtde_venda_produtos = req.body.qtde_venda_produtos;
  const produtoId = req.body.produtoId;
  const vendaId = req.body.vendaId;
  const usuarioId = req.body.usuarioId;

  Venda_produto.update(
    {
      nome: nome,
      medida: medida,
      preco: preco,
      qtde_venda_produtos: qtde_venda_produtos,
      produtoId: produtoId,
      vendaId: vendaId,
      usuarioId: usuarioId,
    },
    {
      where: {
        id: id,
      },
    }
  ).then((resultado) => {
    res.status(201).json({
      mensagem: "Venda do produto alterada",
    });
  });
};

exports.getAll = (req, res, next) => {
  Venda_produto.findAll({
    order: [["nome", "ASC"]],
  }).then((venda_produto) => {
    res.status(200).json({
      mensagem: "Venda dos Produtos encontradas",
      venda_produto: venda_produto,
    });
  });
};
////////////////////////

exports.getAllByUsuario = (req, res, next) => {
  const usuarioId = +req.params.usuarioId; // Obtenha o ID da festa a partir dos parâmetros da URL
  // console.log(usuarioId);
  Venda_produto.findAll({
    where: {
      usuarioId: usuarioId, // Filtra por usuarioId igual ao ID da festa
    },
    include: [
       {
      model: Usuario,
      attributes: ["nome"], // Especifique as colunas da tabela Festa que você deseja incluir
    },
  ],
    order: [["createdAt", "DESC"]],
    attributes: [
      "id",
      "nome",
      "medida",
      "preco",
      "qtde_venda_produtos",
      "usuarioId",
      "produtoId",
      "vendaId",
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
      nome: venda.nome,
      medida: venda.medida,
      preco: venda.preco,
      qtde_venda_produtos: venda.qtde_venda_produtos,
      usuarioId: venda.usuarioId,
      produtoId: venda.produtoId,
      vendaId: venda.vendaId,
      usuarioNome: venda.usuario.nome,
    }));
    //   console.log(vendasComNomesDeUsuarios);
    res.status(200).json({
      mensagem: "Vendas encontradas",
      vendas: vendasComNomesDeUsuarios,
    });
  });
};

///////////////////////////

exports.getOne = (req, res, next) => {
  const id = req.params.id;

  Venda_produto.findOne({
    where: {
      id: id,
    },
  }).then((venda_produto) => {
    res.status(200).json({
      mensagem: "Venda do produto encontrada",
      venda_produto: venda_produto,
    });
  });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Venda_produto.destroy({
    where: {
      id: id,
    },
  }).then((resultado) => {
    res.status(200).json({
      mensagem: "Venda do produto excluída",
    });
  });
};
