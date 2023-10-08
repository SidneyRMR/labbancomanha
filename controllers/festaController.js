const Festa = require('../model/festa');

exports.create = (req, res, next) => {
    const nome = req.body.nome;
    const ativa = req.body.ativa;

    console.log(nome, ativa);

    if(nome === undefined || ativa === undefined)
    {
        res.status(400).json(
            {
                mensagem: 'Campos não definidos'
            }
        );
    }
    else
    {
        Festa.findOne({
            where: {
                nome: nome,
                ativa: ativa
            }
        }).then(festa => {
            if(festa == undefined)
            {
                Festa.create(
                    {
                        nome: nome,
                        ativa: ativa
                    }
                ).then(festaCriado => {
                    res.status(201).json(
                        {
                            mensagem: 'Festa criado',
                            festa: festaCriado
                        }
                    );
                }).catch(err => {
                    console.log(err);
                    res.status(500).json(
                        {
                            mensagem: 'Erro na criação da Festa!',
                            erro: err
                        }
                    );
                });
            }
            else
            {
                res.status(401).json(
                    {
                        mensagem: 'Festa já existe'
                    }
                );
            }
        });
    }
}

exports.update = (req, res, next) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const ativa = req.body.ativa

    Festa.update(
        {
            nome: nome,
            ativa: ativa
        },
        {
            where: {
                id: id
            }
        }
    ).then(resultado => {
        res.status(201).json(
            {
                mensagem: 'Festa alterada'
            }
        );
    });
}

exports.getAll = (req, res, next) => {
    Festa.findAll({
        order: [
            ['ativa', 'ASC'],
            ['createdAt', 'ASC']
        ]
    }).then(festa => {
        res.status(200).json({
            mensagem: 'Festa encontradas',
            festa: festa
        })
    })
}

exports.getOne = (req, res, next) => {
    const id = req.params.id;

    Festa.findOne(
        {
            where: {
                id: id
            }
        }
    ).then(festa => {
        res.status(200).json({
            mensagem: 'Festa encontrado',
            festa: festa
        });
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;
    Festa.destroy(
        {
            where: {
                id: id
            }
        }
    ).then(resultado => {
        res.status(200).json({
            mensagem: 'Festa excluída'
        });
    });
}