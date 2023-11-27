const express = require('express');
const router = express.Router();

const mysql = require('../mysql').pool;

//retornar todos os planos
router.get('/', (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({error: error});
    }
    conn.query(
      'SELECT * FROM planos;',
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

//retornar plano por ID
router.get('/:id', (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({error: error});
    }
    conn.query(
      'SELECT * FROM planos WHERE id_planos = ?;',
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

// cria um novo plano
router.post('/', (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
        response: null
      });
    }
    conn.query(
      'INSERT INTO planos (nome_plano, valor) VALUES (?,?)',
      [req.body.nome_plano, req.body.valor],
      (error, resultado, field) => {
        conn.release(); //fechando a conexão
        if(error) {
          return res.status(500).send ({
            error: error,
            response: null
          });
        }
        res.status(201).send({
          mensagem: 'Plano criado com sucesso'
        });
      }
    )
  });
});

// atualiza um plano existente
router.put('/:id', (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
        response: null
      });
    }
    conn.query(
      'UPDATE planos SET nome_plano = ?, valor = ? WHERE id_planos = ?',
      [req.body.nome_plano, req.body.valor, req.params.id],
      (error, resultado, field) => {
        conn.release(); //fechando a conexão
        if(error) {
          return res.status(500).send ({
            error: error,
            response: null
          });
        }
        res.status(202).send({
          mensagem: 'Plano editado com sucesso',
        });
      }
    )
  });
});

// remove um plano existente
router.delete('/:id', (req, res) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({error: error});
    }
    conn.query(
      'DELETE FROM planos WHERE id_planos = ? ',
      [req.params.id],
      (error, resultado, field) => {
        conn.release(); //fechando a conexão
        if (error) {
          return res.status(500).send({error: error});
        }
        return res.status(202).send({
          mensagem: "plano deletado com sucesso"
        });
      }
    )
  });
});

module.exports = router;