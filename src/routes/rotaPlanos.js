const express = require('express');
const router = express.Router();

const mysql = require('../mysql').pool;

//retornar todos os planos
router.get('/', (req, res) => {
  //res.json(planos);
  
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({error: error});
    }

    conn.query(
      'SELECT * FROM planos;',
      (error, resultado, field) => {
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
  const id = req.params.id;
  res.json(buscarObjetoPorId(planos, id));
});

// cria um novo plano
router.post('/', (req, res) => {
  
  mysql.getConnection((error, conn) => {
    
    if (error) {
      return res.status(500).send({error: error});
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

        console.log('Resultado da consulta:', resultado);

        res.status(201).send({
          mensagem: 'Plano criado com sucesso'
        });
      }
    )
  });
});

// atualiza um plano existente
router.put('/planos/:id', (req, res) => {
  const id = req.params.id;
  const novoPlano = req.body;
  novoPlano.id = id;
  planos[buscarIndiceDoObjetoPorId(planos, id)] = novoPlano;
  res.send('Plano atualizado com sucesso');
});

// remove um plano existente
router.delete('/planos/:id', (req, res) => {
  const id = req.params.id;
  planos.splice(buscarIndiceDoObjetoPorId(planos, id), 1);
  res.send('Plano removido com sucesso');
});


module.exports = router;