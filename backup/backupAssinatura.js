const express = require('express');
const router = express.Router();

const mysql = require('../mysql').pool;

// retorna todas as assinaturas
router.get('/', (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({error: error});
    }
    conn.query(
      'SELECT * FROM assinatura;',
      (error, resultado, field) => {
        conn.release(); //fechando a conexão
        if (error) {
          return res.status(500).send({error: error});
        }
        return res.status(200).send({response: resultado});
      }
    )
  });
});

// retorna assinatura por ID
router.get('/:id', (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({error: error});
    }
    conn.query(
      'SELECT * FROM assinatura WHERE id_assinatura = ?',
      [req.params.id],
      (error, resultado, field) => {
        conn.release(); //fechando a conexão
        if (error) {
          return res.status(500).send({error: error});
        }
        return res.status(200).send({response: resultado});
      }
    )
  });
});

// cria nova assinatura
router.post('/', (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
        response: null
      });
    }
    conn.query(
      'INSERT INTO assinatura (id_usuario, fk_id_planos, assinatura_ativa, data_inicio, data_fim) VALUES (?,?,?,?,?)',
      [req.body.id_usuario, req.body.fk_id_planos, req.body.assinatura_ativa, req.body.data_inicio, req.body.data_fim],
      (error, resultado, field) => {
        conn.release(); //fechando a conexão
        if(error) {
          return res.status(500).send ({
            error: error,
            response: null
          });
        }
        res.status(201).send({
          mensagem: 'Assinatura criado com sucesso'
        });
      }
    )
  });
});

// cancela assinatura
router.put('/:id', (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
        response: null
      });
    }
    conn.query(
      'UPDATE assinatura SET id_usuario = ?, fk_id_planos = ?, assinatura_ativa = ?, data_inicio = ?, data_fim = ?',
      [req.body.id_usuario, req.body.fk_id_planos, req.body.assinatura_ativa, req.body.data_inicio, req.body.data_fim],
      (error, resultado, field) => {
        conn.release(); //fechando a conexão
        if(error) {
          return res.status(500).send ({
            error: error,
            response: null
          });
        }
        res.status(202).send({
          mensagem: 'Assinatura editada com sucesso',
        });
      }
    )
  });
});

module.exports = router;