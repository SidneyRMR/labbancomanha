const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Usuario = require('../model/usuario');
const Utilidades = require('../utilidades/utilidades');

exports.create = (req, res, next) => {
    const nome = req.body.nome;
    const login = req.body.login;
    const senha = req.body.senha;
    const administrador = req.body.administrador;
    const festumId = req.body.festumId;

    if(nome === undefined || login === undefined || senha === undefined || administrador === undefined) 
    {
        res.status(400).json(
            {
                mensagem: 'Campos não definidos'
            }
        );
    }
    else
    {
        bcrypt.hash(senha, 10).then(senhaCriptografada => {
            Usuario.findOne({
                where: {
                    login: login
                }
            }).then(usuario => {
                console.log(usuario);
                if(usuario == undefined)
                {
                    Usuario.create(
                        {
                            nome: nome,
                            login: login,
                            senha: senhaCriptografada,
                            administrador: administrador,
                            festumId: festumId
                        }
                    ).then(usuarioCriado => {
                        res.status(201).json(
                            {
                                mensagem: 'Usuário criado',
                                usuario: {
                                    id: usuarioCriado.id,
                                    nome: usuarioCriado.nome,
                                    login: usuarioCriado.login,
                                    administrador: usuarioCriado.administrador,
                                    festumId: usuarioCriado.festumId,
                                }
                            }
                        );
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json(
                            {
                                mensagem: 'Erro na criação do usuário!',
                                erro: err
                            }
                        );
                    });
                }
                else
                {
                    res.status(401).json(
                        {
                            mensagem: 'Usuário já existe'
                        }
                    );
                }
            });
        });
    }
}

exports.login = (req, res, next) => {
    const JWT_KEY = Utilidades.JWT_KEY;

    const login = req.body.login;
    const senha = req.body.senha;

    let erro = false;
    let usuarioEncontrado;

    Usuario.findOne(
        {
            where: {
                login: login
            }
        }
    ).then(usuario => {
        if(!usuario)
        {
            erro = true;
            return res.status(401).json(
                {
                    mensagem: 'Credenciais inválidas!'
                }
            );
        }
        else
        {
            usuarioEncontrado = usuario;
            return bcrypt.compare(senha, usuario.senha);
        }
    })
    .then(resultado => {
        if(!erro)
        {
            if(!resultado)
            {
                return res.status(401).json(
                    {
                        mensagem: 'Credenciais inválidas!'
                    }
                );
            }
            const token = jwt.sign(
                {
                    login: usuarioEncontrado.login
                },
                JWT_KEY,
                {
                    expiresIn: '1h'
                }
            );
            res.status(200).json(
                {
                    token: token,
                    expiresIn: '3600',
                    usuarioId: usuarioEncontrado.id
                }
            );
        }
    })
    .catch(err => {
        console.log(err);
        res.status(401).json(
            {
                mensagem: 'Credenciais inválidas!'
            }
        );
    });
}

exports.trocarSenha = (req, res, next) => {
    const senha = req.body.senha;
    const id = req.body.id;

    bcrypt.hash(senha, 10)
    .then(senhaCriptografada => {
        Usuario.update(
            {
                senha: senhaCriptografada
            },
            {
                where: {
                    id: id
                }
            }
        ).then(resultado => {
            res.status(201).json(
                {
                    mensagem: 'Senha alterada!'
                }
            );
        });
    });
}

exports.update = (req, res, next) => {
    const id = req.params.id;
    const login = req.body.login;
    const nome = req.body.nome;
    const administrador = req.body.administrador;
    const festumId = req.body.festumId;

    Usuario.update(
        {
            login: login,
            nome: nome,
            administrador: administrador,
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
                mensagem: 'Usuario alterado'
            }
        );
    });
}

exports.getAll = (req, res, next) => {
    Usuario.findAll({
        order: [
            ['nome', 'ASC']
        ],
        attributes: ['id', 'login', 'nome', 'administrador', 'festumId']
    }).then(usuarios => {
        res.status(200).json({
            mensagem: 'Usuários encontrados',
            usuarios: usuarios
        })
    })
}

exports.getOne = (req, res, next) => {
    const id = req.params.id;

    Usuario.findOne(
        {
            where: {
                id: id
            },
            attributes: ['id', 'login', 'nome', 'administrador', 'festumId']
        }
    ).then(usuario => {
        res.status(200).json({
            mensagem: 'Usuario encontrado',
            usuario: usuario
        });
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;
    Usuario.destroy(
        {
            where: {
                id: id
            }
        }
    ).then(usuario => {
        res.status(200).json({
            mensagem: 'Usuario excluído'
        });
    });
}