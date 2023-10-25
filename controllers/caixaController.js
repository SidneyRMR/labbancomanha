const Caixa = require('../model/caixa');
const Festa = require('../model/festa');
const Usuario = require('../model/usuario');

exports.create = (req, res, next) => {
    const saldo_dinheiro = req.body.saldo_dinheiro;
    const aberto = req.body.aberto;
    const usuarioId = req.body.usuarioId;
    const festaId = req.body.festaId;
  
    console.log(saldo_dinheiro, aberto);
  
    if (saldo_dinheiro === undefined || aberto === undefined || usuarioId === undefined || festaId === undefined) {
      res.status(400).json({
        mensagem: 'Campos não definidos'
      });
    } else {
      // Verifica se já existe um caixa aberto para o mesmo usuário e festa
      Caixa.findOne({
        where: {
          aberto: 1, // Caixa aberto
          usuarioId: usuarioId,
          festaId: festaId
        }
      }).then(caixaAberto => {
        if (caixaAberto) {
          res.status(401).json({
            mensagem: 'Já existe um caixa aberto para este usuário e festa.'
          });
        } else {
          Caixa.create({
            saldo_dinheiro: saldo_dinheiro,
            aberto: aberto,
            usuarioId: usuarioId,
            festaId: festaId
          }).then(caixaCriado => {
            res.status(201).json({
              mensagem: 'Caixa criado',
              caixa: caixaCriado
            });
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              mensagem: 'Erro na criação do Caixa!',
              erro: err
            });
          });
        }
      });
    }
  };
  

exports.update = (req, res, next) => {
    const id = req.params.id;
    const saldo_dinheiro = req.body.saldo_dinheiro;
    const aberto = req.body.aberto;
    const usuarioId = req.body.usuarioId;
    const festaId = req.body.festaId;

    Caixa.update(
        {
            saldo_dinheiro: saldo_dinheiro,
            aberto: aberto,
            usuarioId: usuarioId,
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
                mensagem: 'Caixa alterado'
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
        if (!caixa) {
            return res.status(404).json({
              mensagem: "Nenhum caixa encontrado.",
              caixa: [],
            });
          }
        res.status(200).json({
            mensagem: 'Caixa encontrados',
            caixa: caixa
        })
    })
}

exports.getAllByUsuario = (req, res, next) => {
    const usuarioId = +req.params.usuarioId; // Obtenha o ID da usuario a partir dos parâmetros da URL
    // const festaId = +req.params.festaId;
    console.log(usuarioId);
  Caixa.findAll({
    where: {
      usuarioId: usuarioId, // Filtra por usuarioId igual ao ID do usuário
    },
    include: [
      {
        model: Usuario, // Associação para obter o nome do usuário
        attributes: ['nome'], // Especifique as colunas da tabela Usuario que você deseja incluir
      },
      {
        model: Festa, // Associação para obter o nome da festa
        attributes: ['nome'], // Especifique as colunas da tabela Festa que você deseja incluir
      },
    ],
    order: [['aberto', 'DESC']],
    attributes: ['id', 'saldo_dinheiro', 'aberto', 'festaId', 'usuarioId'],
  }).then((caixas) => {
    if (!caixas) {
      return res.status(404).json({
        mensagem: 'Nenhum caixa encontrado para este usuário.',
        caixas: [],
      });
    }
    // console.log(caixas)
    const caixasComNomesDoUsuario = caixas.map((caixa) => ({
      id: caixa.id,
      saldo_dinheiro: caixa.saldo_dinheiro,
      aberto: caixa.aberto,
      festaNome: caixa.festum.nome, // Obtenha o nome da festa a partir do join
      usuarioNome: caixa.usuario.nome, // Obtenha o nome do usuário a partir do join
    }));
    console.log(caixasComNomesDoUsuario);
    res.status(200).json({
      mensagem: 'Caixas encontrados',
      caixas: caixasComNomesDoUsuario,
    });
  });
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