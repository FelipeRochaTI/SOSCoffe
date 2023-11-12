const express = require('express');
const router = express.Router();




//retornar todos os planos
router.get('/', (req, res) => {
  //res.json(planos);
  res.status(200).send({
    mensagem: 'retornando planos'
  });
});

//retornar plano por ID
router.get('/planos/:id', (req, res) => {
  const id = req.params.id;
  res.json(buscarObjetoPorId(planos, id));
});

// cria um novo plano
router.post('/planos', (req, res) => {
  const novoPlano = req.body;
  novoPlano.id = idPlano++;
  planos.push(novoPlano);
  res.send('Plano adicionado com sucesso');
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