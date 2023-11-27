const express = require('express');
const router = express.Router();
const AssinaturaService = require('../services/assinaturaService');
const AssinaturaDTO = require('../dtos/assinaturaDTO');

const assinaturaService = new AssinaturaService();

// Retorna todas as assinaturas
router.get('/', (req, res) => {
  assinaturaService.getAllAssinaturas((error, resultado) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    return res.status(200).send({ response: resultado });
  });
});

// Retorna assinatura por ID de assinatura
router.get('/:id', (req, res) => {
  const id = req.params.id;
  assinaturaService.getAssinaturaById(id, (error, resultado) => {
    if (error == null) {
      return res.status(200).send({ response: resultado });
    }else if (error.message === 'assinatura não encontrada') {
      return res.status(404).send({ mensagem: 'assinatura não encontrada'});
    } else {
      return res.status(500).send({ error: error });
    }
  });
});

// Retorna assinaturas de um usuário pelo ID do usuário
router.get('/usuario/:id_usuario', (req, res) => {
  const idUsuario = req.params.id_usuario;

  assinaturaService.getAssinaturasByUsuarioId(idUsuario, (error, resultado) => {
    if (error == null) {
      return res.status(200).send({ response: resultado });
    }else if (error.message === 'Usuario não encontrado') {
      return res.status(404).send({ mensagem: 'Usuario não encontrado'});
    } else {
      return res.status(500).send({ error: error });
    }
  });
});

router.get('/usuario/ativa/:id_usuario', (req, res) => {
  const idUsuario = req.params.id_usuario;

  assinaturaService.getAssinaturaAtivaByUsuarioId(idUsuario, (error, assinaturaAtiva) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    if (!assinaturaAtiva) {
      return res.status(404).send({ mensagem: 'Nenhuma assinatura ativa encontrada para esse usuário' });
    }

    return res.status(200).send({ response: assinaturaAtiva });
  });
});

// Cria uma nova assinatura
router.post('/', (req, res) => {
  const assinaturaDTO = new AssinaturaDTO(
    req.body.id_usuario,
    req.body.fk_id_planos,
    req.body.assinatura_ativa,
    req.body.data_inicio,
    req.body.data_fim
  );
  
  assinaturaService.createAssinatura(assinaturaDTO, (error, resultado) => {
    if (error) {
      if (error.message === 'Usuário já possui uma assinatura ativa') {
        return res.status(400).send({ mensagem: 'Usuário já possui uma assinatura ativa' });
      }
      return res.status(500).send({ error: error, response: null });
    }
    res.status(201).send({ mensagem: 'Assinatura criada com sucesso' });
  });
});

// Cancela uma assinatura
router.put('/:id_usuario', (req, res) => {
  const assinaturaDTO = new AssinaturaDTO(req.params.id_usuario);

  assinaturaService.cancelaAssinatura(assinaturaDTO, (error, resultado) => {
    if (error) {
      if (error.message === 'Usuário não possui uma assinatura ativa') {
        return res.status(404).send({ mensagem: 'Usuário não possui uma assinatura ativa' });
      }
      return res.status(500).send({ error: error, response: null });
    }

    res.status(200).send({ mensagem: 'Assinatura desativada com sucesso' });
  });
});

module.exports = router;