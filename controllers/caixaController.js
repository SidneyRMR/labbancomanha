const Caixa = require('../model/caixa');

exports.create = (req, res, next) => {
    const saldo_dinheiro = req.body.saldo_dinheiro;
    const aberto = req.body.aberto;
    const usuarioId = req.body.usuarioId;
    const festumId = req.body.festumId;

    console.log(saldo_dinheiro, aberto);

    if(saldo_dinheiro === undefined || aberto === undefined || usuarioId === undefined || festumId === undefined)
    {
        res.status(400).json(
            {
                mensagem: 'Campos não definidos'
            }
        );
    }
    else
    {
        Caixa.findOne({
            where: {
                saldo_dinheiro: saldo_dinheiro,
                aberto: aberto,
                usuarioId: usuarioId,
                festumId: festumId
            }
        }).then(caixa => {
            if(caixa == undefined)
            {
                Caixa.create(
                    {
                        saldo_dinheiro: saldo_dinheiro,
                        aberto: aberto,
                        usuarioId: usuarioId,
                        festumId: festumId
                    }
                ).then(caixaCriado => {
                    res.status(201).json(
                        {
                            mensagem: 'Caixa criado',
                            caixa: caixaCriado
                        }
                    );
                }).catch(err => {
                    console.log(err);
                    res.status(500).json(
                        {
                            mensagem: 'Erro na criação do Caixa!',
                            erro: err
                        }
                    );
                });
            }
            else
            {
                res.status(401).json(
                    {
                        mensagem: 'Caixa já existe'
                    }
                );
            }
        });
    }
}

exports.update = (req, res, next) => {
    const id = req.params.id;
    const saldo_dinheiro = req.body.saldo_dinheiro;
    const aberto = req.body.aberto;
    const usuarioId = req.body.usuarioId;
    const festumId = req.body.festumId;

    Caixa.update(
        {
            saldo_dinheiro: saldo_dinheiro,
            aberto: aberto,
            usuarioId: usuarioId,
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
                mensagem: 'Caixa alterada'
            }
        );
    });
}

exports.getAll = (req, res, next) => {
    Caixa.findAll({
        order: [
            ['aberto', 'ASC']
        ]
    }).then(caixa => {
        res.status(200).json({
            mensagem: 'Caixa encontradas',
            caixa: caixa
        })
    })
}

exports.getOne = (req, res, next) => {
    const id = req.params.id;

    Caixa.findOne(
        {
            where: {
                id: id
            }
        }
    ).then(caixa => {
        res.status(200).json({
            mensagem: 'Caixa encontrado',
            caixa: caixa
        });
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;
    Caixa.destroy(
        {
            where: {
                id: id
            }
        }
    ).then(resultado => {
        res.status(200).json({
            mensagem: 'Caixa excluído'
        });
    });
}