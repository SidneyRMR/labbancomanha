const Produto = require('../model/produto');
const Festa = require('../model/festa');

exports.create = (req, res, next) => {
    const nome = req.body.nome;
    const preco = req.body.preco;
    const medida = req.body.medida;
    const estoque = req.body.estoque;
    const tipo = req.body.tipo;
    const ativo = 1;
    const festaId = req.body.festaId;

    // console.log(nome, preco,medida,estoque,tipo,ativo,festaId);

    if(nome === undefined || preco === undefined || medida === undefined || festaId === undefined || estoque === undefined || tipo === undefined || ativo === undefined)
    {
        res.status(400).json(
            {
                mensagem: 'Campos não definidos'
            }
        );
    }
    else
    {
        Produto.findOne({
            where: {
                nome: nome,
                preco: preco,
                medida: medida,
                estoque: estoque,
                tipo: tipo,
                ativo: ativo,
                festaId: festaId
            }
        }).then(produto => {
            if(produto == undefined)
            {
                Produto.create(
                    {
                        nome: nome,
                        preco: preco,
                        medida: medida,
                        estoque: estoque,
                        tipo: tipo,
                        ativo: ativo,
                        festaId: festaId
                    }
                ).then(produtoCriado => {
                    res.status(201).json(
                        {
                            mensagem: 'Produto criado',
                            produto: produtoCriado
                        }
                    );
                }).catch(err => {
                    console.log(err);
                    res.status(500).json(
                        {
                            mensagem: 'Erro na criação do Produto!',
                            erro: err
                        }
                    );
                });
            }
            else
            {
                res.status(401).json(
                    {
                        mensagem: 'Produto já existe'
                    }
                );
            }
        });
    }
}

exports.update = (req, res, next) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const preco = req.body.preco;
    const medida = req.body.medida;
    const estoque = req.body.estoque;
    const tipo = req.body.tipo;
    const ativo = req.body.ativo;
    const festaId = req.params.festaId;

    // console.log(nome, preco,medida,estoque,tipo,ativo,festaId);
    
    Produto.update(
        {
            nome: nome,
            preco: preco,
            medida: medida,
            estoque: estoque,
            tipo: tipo,
            ativo: ativo,
            festaId: festaId
        },
        {
            where: {
                id: id
            }
        }
    ).then(resultado => {
        res.status(201).json(
            {
                mensagem: 'Produto alterado'
            }
        );
    });
}

exports.getAll = (req, res, next) => {
    Produto.findAll({
        order: [
            ['nome', 'ASC'],
            ["ativo", "ASC"]
        ]
    }).then(produto => {
        if (!produto) {
            return res.status(404).json({
              mensagem: "Nenhum produto encontrado..",
              usuarios: [],
            });
          }
        res.status(200).json({
            mensagem: 'Produto encontrados',
            produto: produto
        })
    })
}

exports.getAllByFesta = (req, res, next) => {
    const festaId = +req.params.festaId; // Obtenha o ID da festa a partir dos parâmetros da URL
    // console.log(festaId);
    Produto.findAll({
      where: {
          festaId: festaId, // Filtra por festaId igual ao ID da festa
      },
      include: {
        model: Festa,
        attributes: ["nome"], // Especifique as colunas da tabela Festa que você deseja incluir
      },
      order: [
        ["nome", "ASC"],
        ["ativo", "ASC"],
      ],
      attributes: ["id", "nome", "preco", "medida", "estoque", "tipo" ,"ativo", "festaId"],
    }).then((produtos) => {
        if (!produtos) {
          return res.status(404).json({
            mensagem: 'Nenhum produto encontrado para esta festa.',
            produtos: [],
          });
        }
        const produtosComNomesDeFesta = produtos.map((produto) => ({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            medida: produto.medida,
            estoque: produto.estoque,
            tipo: produto.tipo,
            ativo: produto.ativo,
            festaNome: produto.festum.nome, // Obtenha o nome da festa a partir do join
          }));
        //   console.log(produtosComNomesDeFesta);
      res.status(200).json({
        mensagem: "Produtos encontrados",
        produtos: produtosComNomesDeFesta,
      });
    });
  };

exports.getOne = (req, res, next) => {
    const id = req.params.id;

    Produto.findOne(
        {
            where: {
                id: id
            }
        }
    ).then(produto => {
        res.status(200).json({
            mensagem: 'Produto encontrado',
            produto: produto
        });
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;
    Produto.destroy(
        {
            where: {
                id: id
            }
        }
    ).then(resultado => {
        res.status(200).json({
            mensagem: 'Produto excluído'
        });
    });
}