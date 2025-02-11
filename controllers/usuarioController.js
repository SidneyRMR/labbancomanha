const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Festa = require("../model/festa");
const Usuario = require("../model/usuario");
const Utilidades = require("../utilidades/utilidades");

exports.create = (req, res, next) => {
  const nome = req.body.nome;
  const login = req.body.login;
  const senha = req.body.senha;
  const administrador = 0;
  const ativo = 1;
  const festaId = req.body.festaId;

  if (
    nome === undefined ||
    login === undefined ||
    senha === undefined ||
    administrador === undefined ||
    festaId === undefined
  ) {
    res.status(400).json({
      mensagem: "Campos não definidos",
    });
  } else {
    bcrypt.hash(senha, 10).then((senhaCriptografada) => {
      Usuario.findOne({
        where: {
          login: login,
          // festaId: festaId,
        },
      }).then((usuario) => {
        // console.log(usuario);
        if (usuario == undefined) {
          Usuario.create({
            nome: nome,
            login: login,
            senha: senhaCriptografada,
            administrador: administrador,
            ativo: ativo,
            festaId: festaId,
          })
            .then((usuarioCriado) => {
              res.status(201).json({
                mensagem: "Usuário criado",
                usuario: {
                  id: usuarioCriado.id,
                  nome: usuarioCriado.nome,
                  login: usuarioCriado.login,
                  administrador: usuarioCriado.administrador,
                  ativo: usuarioCriado.ativo,
                  festaId: usuarioCriado.festaId,
                },
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                mensagem: "Erro na criação do usuário!",
                erro: err,
              });
            });
        } else {
          res.status(401).json({
            mensagem: "Usuário já existe",
          });
        }
      });
    });
  }
};

// Rotina usada para criação do masterUser no BD
exports.create2 = (req, res, next) => {
  const nome = process.env.API_NOME;
  const login = process.env.API_LOGIN;
  const senha = process.env.API_SENHA;
  const administrador = process.env.API_ADMINISTRADOR;
  const ativo = process.env.API_ATIVO;
  const festaId = process.env.API_FESTAID;

  if (
    nome === undefined ||
    login === undefined ||
    senha === undefined ||
    ativo === undefined ||
    administrador === undefined ||
    festaId === undefined
  ) {
    res.status(400).json({
      mensagem: "Campos não definidos",
    });
  } else {
    bcrypt.hash(senha, 10).then((senhaCriptografada) => {
      Usuario.findOne({
        where: {
          login: login,
        },
      }).then((usuario) => {
        // console.log(usuario);
        if (usuario == undefined) {
          Usuario.create({
            nome: nome,
            login: login,
            senha: senhaCriptografada,
            administrador: administrador,
            ativo: ativo,
            festaId: festaId,
          })
            .then((usuarioCriado) => {
              res.status(201).json({
                mensagem: "Usuário criado",
                usuario: {
                  id: usuarioCriado.id,
                  nome: usuarioCriado.nome,
                  login: usuarioCriado.login,
                  administrador: usuarioCriado.administrador,
                  ativo: usuarioCriado.ativo,
                  festaId: usuarioCriado.festaId,
                },
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                mensagem: "Erro na criação do usuário!",
                erro: err,
              });
            });
        } else {
          res.status(401).json({
            mensagem: "Usuário já existe",
          });
        }
      });
    });
  }
};

exports.login = (req, res, next) => {
  const JWT_KEY = Utilidades.JWT_KEY;

  const login = req.body.login;
  const senha = req.body.senha;
  // console.log("Login",login)
  // console.log("Senha",senha)

  let erro = false;
  let usuarioEncontrado;

  Usuario.findOne({
    where: {
      login: login,
    },
  })
    .then((usuario) => {
      if (!usuario) {
        erro = true;
        return res.status(401).json({
          mensagem: "Credenciais inválidas!",
        });
      } else {
        usuarioEncontrado = usuario;
        return bcrypt.compare(senha, usuario.senha);
      }
    })
    .then((resultado) => {
      if (!erro) {
        if (!resultado) {
          return res.status(401).json({
            mensagem: "Credenciais inválidas!",
          });
        }
        const token = jwt.sign(
          {
            login: usuarioEncontrado.login,
          },
          JWT_KEY,
          {
            expiresIn: "6h",
          }
        );
        res.status(200).json({
          token: token,
          expiresIn: "21600",
          usuarioId: usuarioEncontrado.id,
          usuarioNome: usuarioEncontrado.nome,
          usuarioFesta: usuarioEncontrado.festaId,
          isAdmin: usuarioEncontrado.administrador,
        });
        // console.log('tempo restante',expiresIn)
      }
    })
    .catch((err) => {
      console.log("Erro: ", err);
      res.status(401).json({
        mensagem: "Credenciais inválidas!",
      });
    });
};

exports.trocarSenha = (req, res, next) => {
  const senha = req.body.senha;
  const id = req.body.id;

  bcrypt.hash(senha, 10).then((senhaCriptografada) => {
    Usuario.update(
      {
        senha: senhaCriptografada,
      },
      {
        where: {
          id: id,
        },
      }
    ).then((resultado) => {
      res.status(201).json({
        mensagem: "Senha alterada!",
      });
    });
  });
};

exports.update = (req, res, next) => {
  const id = req.params.id;
  const login = req.body.login;
  const nome = req.body.nome;
  const administrador = req.params.administrador;
  const ativo = req.body.ativo;
  const festaId = req.params.festaId;

  Usuario.update(
    {
      login: login,
      nome: nome,
      administrador: administrador,
      ativo: ativo,
      festaId: festaId,
    },
    {
      where: {
        id: id,
      },
    }
  ).then((resultado) => {
    res.status(201).json({
      mensagem: "Usuario alterado",
    });
  });
};

exports.getAll = (req, res, next) => {
  Usuario.findAll({
    order: [
      ["nome", "ASC"],
      ["ativo", "ASC"],
    ],
    attributes: ["id", "login", "nome", "ativo", "administrador", "festaId"],
  }).then((usuario) => {
    if (!usuario) {
      return res.status(404).json({
        mensagem: "Nenhum usuário encontrado.",
        usuarios: [],
      });
    }
    res.status(200).json({
      mensagem: "Usuários encontrados",
      usuario: usuario,
    });
  });
};

exports.getAllByFesta = (req, res, next) => {
  const festaId = +req.params.festaId; // Obtenha o ID da festa a partir dos parâmetros da URL
//   console.log(festaId);
  Usuario.findAll({
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
    attributes: ["id", "login", "nome", "ativo", "administrador", "festaId"],
  }).then((usuarios) => {
      if (!usuarios) {
        return res.status(404).json({
          mensagem: 'Nenhum usuário encontrado para esta festa.',
          usuarios: [],
        });
      }
      const usuariosComNomesDeFesta = usuarios.map((usuario) => ({
          id: usuario.id,
          login: usuario.login,
          nome: usuario.nome,
          ativo: usuario.ativo,
          administrador: usuario.administrador,
          // festaNome: usuario.festum.nome, // Obtenha o nome da festa a partir do join
        }));
        // console.log(usuariosComNomesDeFesta);
    res.status(200).json({
      mensagem: "Usuários encontrados",
      usuarios: usuariosComNomesDeFesta,
    });
  });
};

exports.getOne = (req, res, next) => {
  const id = req.params.id;

  Usuario.findOne({
    where: {
      id: id,
    },
    attributes: ["id", "login", "nome", "ativo", "administrador", "festaId"],
  }).then((usuario) => {
    res.status(200).json({
      mensagem: "Usuario encontrado",
      usuario: usuario,
    });
  });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Usuario.destroy({
    where: {
      id: id,
    },
  }).then((usuario) => {
    res.status(200).json({
      mensagem: "Usuario excluído",
    });
  });
};
