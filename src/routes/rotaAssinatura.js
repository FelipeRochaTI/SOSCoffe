const express = require('express');
const router = express.Router();

// retorna todas as assinaturas
router.get('/', (req, res) => {
  //res.json(assinaturas);
  res.json({assinatura: 'asd'})
});

// retorna assinatura por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.json(buscarObjetoPorId(assinaturas, id));
});

// cria nova assinatura
router.post('/', (req, res) => {
  res.send(assinarPlano(req.body.idPlano, req.body.idUsuario, diaVencimento = 10));
});

// cancela assinatura
router.put('/:id', (req, res) => {
  res.send(cancelarPlano(req.params.id));
});

// reativa de assinatura
router.put('/:id', (req, res) => {
  res.send(reativaPlano(req.params.id));
});

module.exports = router;