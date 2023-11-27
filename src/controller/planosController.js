const express = require('express');
const router = express.Router();
const PlanoService = require('../services/planoService');
const PlanoDTO = require('../dtos/planoDTO');

const planoService = new PlanoService();

// Retorna todos os planos
router.get('/', (req, res) => {
  planoService.getAllPlanos((error, resultado) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    return res.status(200).send({ response: resultado });
  });
});

// Retorna plano por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  planoService.getPlanoById(id, (error, resultado) => {
    if (error == null) {
      return res.status(200).send({ response: resultado });
    }else if (error.message === 'Plano não encontrado') {
      return res.status(404).send({ mensagem: 'Plano não encontrado' });
    } else {
      return res.status(500).send({ error: error });
    }
  });
});

// Cria um novo plano
router.post('/', (req, res) => {
  const planoDTO = new PlanoDTO(req.body.nome_plano, req.body.valor);
  planoService.createPlano(planoDTO, (error, resultado) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    res.status(201).send({ mensagem: 'Plano criado com sucesso' });
  });
});

// Atualiza um plano existente
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const planoDTO = new PlanoDTO(req.body.nome_plano, req.body.valor);
  planoService.updatePlano(id, planoDTO, (error, resultado) => {
    if (error == null) {
      res.status(202).send({ mensagem: 'Plano editado com sucesso' });
    }else if (error.message === 'Plano não encontrado') {
      return res.status(404).send({ mensagem: 'Plano não encontrado' });
    } else {
      return res.status(500).send({ error: error });
    }
  });
});

// Remove um plano existente
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  planoService.deletePlano(id, (error, resultado) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    return res.status(202).send({ mensagem: 'Plano deletado com sucesso' });
  });
});

module.exports = router;