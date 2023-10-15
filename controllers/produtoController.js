const Produto = require('../model/produto');

exports.create = (req, res, next) => {
    const nome = req.body.nome;
    const preco = req.body.preco;
    const medida = req.body.medida;
    const estoque = req.body.estoque;
    const tipo = req.body.tipo;
    const ativo = 1;
    const festumId = req.body.festumId;

    console.log(nome, preco,medida,estoque,tipo,ativo,festumId);

    if(nome === undefined || preco === undefined || medida === undefined || festumId === undefined || estoque === undefined || tipo === undefined || ativo === undefined)
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
                festumId: festumId
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
                        festumId: festumId
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
    const festumId = req.params.festumId;

    console.log(nome, preco,medida,estoque,tipo,ativo,festumId);
    
    Produto.update(
        {
            nome: nome,
            preco: preco,
            medida: medida,
            estoque: estoque,
            tipo: tipo,
            ativo: ativo,
            festumId: festumId
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
            ['nome', 'ASC']
        ]
    }).then(produto => {
        res.status(200).json({
            mensagem: 'Produto encontrados',
            produto: produto
        })
    })
}

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