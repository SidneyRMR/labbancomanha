const Venda = require('../model/venda');

exports.create = (req, res, next) => {
    const debito = req.body.debito;
    const credito = req.body.credito;
    const pix = req.body.pix;
    const dinheiro = req.body.dinheiro;
    const caixaId = req.body.caixaId;
    const usuarioId = req.body.usuarioId;

    console.log(debito, credito);

    if(debito === undefined || credito === undefined || pix === undefined || dinheiro === undefined || caixaId === undefined || usuarioId === undefined)
    {
        res.status(400).json(
            {
                mensagem: 'Campos não definidos'
            }
        );
    }
    else
    {
        Venda.findOne({
            where: {
                debito: debito,
                credito: credito,
                pix: pix,
                dinheiro: dinheiro,
                caixaId: caixaId,
                usuarioId: usuarioId
            }
        }).then(venda => {
            if(venda == undefined)
            {
                Venda.create(
                    {
                        debito: debito,
                        credito: credito,
                        pix: pix,
                        dinheiro: dinheiro,
                        caixaId: caixaId,
                        usuarioId: usuarioId
                    }
                ).then(vendaCriado => {
                    res.status(201).json(
                        {
                            mensagem: 'Venda criada',
                            venda: vendaCriado
                        }
                    );
                }).catch(err => {
                    console.log(err);
                    res.status(500).json(
                        {
                            mensagem: 'Erro na criação da venda!',
                            erro: err
                        }
                    );
                });
            }
            else
            {
                res.status(401).json(
                    {
                        mensagem: 'Venda já existe'
                    }
                );
            }
        });
    }
}

exports.update = (req, res, next) => {
    const id = req.params.id;
    const debito = req.body.debito;
    const credito = req.body.credito;
    const pix = req.body.pix;
    const dinheiro = req.body.dinheiro;
    const caixaId = req.body.caixaId;
    const usuarioId = req.body.usuarioId;

    Venda.update(
        {
            debito: debito,
            credito: credito,
            pix: pix,
            dinheiro: dinheiro,
            caixaId: caixaId,
            usuarioId: usuarioId
        },
        {
            where: {
                id: id
            }
        }
    ).then(resultado => {
        res.status(201).json(
            {
                mensagem: 'Venda alterada'
            }
        );
    });
}

exports.getAll = (req, res, next) => {
    Venda.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(venda => {
        res.status(200).json({
            mensagem: 'Vendas encontradas',
            venda: venda
        })
    })
}

exports.getOne = (req, res, next) => {
    const id = req.params.id;

    Venda.findOne(
        {
            where: {
                id: id
            }
        }
    ).then(venda => {
        res.status(200).json({
            mensagem: 'Venda encontrada',
            venda: venda
        });
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;
    Venda.destroy(
        {
            where: {
                id: id
            }
        }
    ).then(resultado => {
        res.status(200).json({
            mensagem: 'Venda excluída'
        });
    });
}