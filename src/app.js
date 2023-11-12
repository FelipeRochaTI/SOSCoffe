const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Rota dos Planos
const rotaPlanos = require('./routes/rotaPlanos');
app.use('/planos', rotaPlanos);

//Rota das Assinaturas
const rotaAssinatura = require('./routes/rotaAssinatura');
app.use('/assinaturas', rotaAssinatura);



module.exports = app;