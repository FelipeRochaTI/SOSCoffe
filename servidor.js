const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 3000; // Porta em que o servidor será executado
app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
});

// Armazenamento
let planos = [{}];
let usuarios = [{}];
let assinaturas = [{}];

// Contadores para id
let idPlano = 0;
let idUsuario = 0;
let idAssinatura = 0;


// --- EXEMPLOS ---

// Preenchendo array com exemplos de planos
planos = [
    { id: idPlano++, nome: 'básico', valor: 19.99 },
    { id: idPlano++, nome: 'Medium', valor: 29.99 },
    { id: idPlano++, nome: 'Premium', valor: 49.99 }
];

// Preenchendo Array com exemplos de usuarios
usuarios = [
    { id: idUsuario++, nome: 'fulano', email: 'fulano@esobreisso.com' },
    { id: idUsuario++, nome: 'ciclano', email: 'ciclano@esobreisso.com' },
    { id: idUsuario++, nome: 'beutrano', email: 'beutrano@esobreisso.com' }
];

// Preenchendo Array com exemplos de Assinaturas
assinaturas = [
    { id: idAssinatura++, idPlano: 0, idUsuario: 0, assinatura: true, dataComeco: new Date(), dataCancelamento: -1 },
    { id: idAssinatura++, idPlano: 1, idUsuario: 1, assinatura: true, dataComeco: new Date(), dataCancelamento: -1 },
    { id: idAssinatura++, idPlano: 2, idUsuario: 2, assinatura: true, dataComeco: new Date(), dataCancelamento: -1 }
];


//--- ROTAS DOS PLANOS---

// Rota para adicionar um novo plano
app.post('/sub/planos', (req, res) => {
    const novoPlano = req.body;
    novoPlano.id = idPlano++;
    planos.push(novoPlano);
    res.send('Plano adicionado com sucesso');
});

//Rota para retornar todos os planos
app.get('/sub/planos', (req, res) => {
    res.json(planos);
});

//Rota para retornar plano por ID
app.get('/sub/planos/:id', (req, res) => {
    const id = req.params.id;
    res.json(buscarObjetoPorId(planos, id));
});

// Rota para atualizar um plano existente
app.put('/sub/planos/:id', (req, res) => {
    const id = req.params.id;
    const novoPlano = req.body;
    novoPlano.id = id;
    planos[buscarIndiceDoObjetoPorId(planos, id)] = novoPlano;
    res.send('Plano atualizado com sucesso');
});

// Rota para remover um plano existente
app.delete('/sub/planos/:id', (req, res) => {
    const id = req.params.id;
    planos.splice(buscarIndiceDoObjetoPorId(planos, id), 1);
    res.send('Plano removido com sucesso');
});


// --- ROTAS DAS ASSINATURAS ---

// Rota para nova assinatura
app.post('/sub/novaAssinatura', (req, res) => {
    res.send(assinarPlano(req.body.idPlano, req.body.idUsuario, diaVencimento = 10));
});

//Rota para retornar todas as assinaturas
app.get('/sub/assinaturas', (req, res) => {
    res.json(assinaturas);
});

//Rota para retornar assinatura por ID
app.get('/sub/assinaturas/:id', (req, res) => {
    const id = req.params.id;
    res.json(buscarObjetoPorId(assinaturas, id));
});

// Rota para cancelamento de assinatura
app.put('/sub/cancelaAssinatura/:id', (req, res) => {
    res.send(cancelarPlano(req.params.id));
});

// Rota para reativar de assinatura
app.put('/sub/reativaAssinatura/:id', (req, res) => {
    res.send(reativaPlano(req.params.id));
});


// --- ROTAS DE USUÁRIOS ---

// Rota para adicionar um novo Usuario
app.post('/sub/usuarios', (req, res) => {
    const novoUsuario = req.body;
    novoUsuario.id = idUsuario++;
    usuarios.push(novoUsuario);
    res.send('Usuario adicionado com sucesso');
});

//Rota para retornar todos os usuarios
app.get('/sub/usuarios', (req, res) => {
    res.json(usuarios);
});

//Rota para retornar plano por ID
app.get('/sub/usuarios/:id', (req, res) => {
    const id = req.params.id;
    res.json(buscarObjetoPorId(usuarios, id));
});

// Rota para atualizar um plano existente
app.put('/sub/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const novoUsuarios = req.body;
    novoUsuarios.id = id;
    usuarios[buscarIndiceDoObjetoPorId(usuarios, id)] = novoUsuarios;
    res.send('Usuarios atualizado com sucesso');
});

// Rota para remover um plano existente
app.delete('/sub/usuarios/:id', (req, res) => {
    const id = req.params.id;
    usuarios.splice(buscarIndiceDoObjetoPorId(usuarios, id), 1);
    res.send('Usuarios removido com sucesso');
});

// Rota para adicionar um novo Usuario
app.post('/sub/usuarios', (req, res) => {
    const novoUsuario = req.body;
    novoUsuario.id = idUsuario++;
    usuarios.push(novoUsuario);
    res.send('Usuario adicionado com sucesso');
});

//Rota para retornar todos os usuarios
app.get('/sub/usuarios', (req, res) => {
    res.json(usuarios);
});

//Rota para retornar plano por ID
app.get('/sub/usuarios/:id', (req, res) => {
    const id = req.params.id;
    res.json(buscarObjetoPorId(usuarios, id));
});

// Rota para atualizar um plano existente
app.put('/sub/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const novoUsuarios = req.body;
    novoUsuarios.id = id;
    usuarios[buscarIndiceDoObjetoPorId(usuarios, id)] = novoUsuarios;
    res.send('Usuarios atualizado com sucesso');
});

// Rota para remover um plano existente
app.delete('/sub/usuarios/:id', (req, res) => {
    const id = req.params.id;
    usuarios.splice(buscarIndiceDoObjetoPorId(usuarios, id), 1);
    res.send('Usuarios removido com sucesso');
});

app.get('/sub/debitoMensal/:id', (req, res) => {
    res.json(gerarDebitoMensal(req.params.id))
})
// --- FUNÇÕES DE MANIPULAÇÃO ---

function cancelarPlano(idUsuario) {
    let index = buscarIndiceDoObjetoPorId(assinaturas, idUsuario);
    assinaturas[index].assinatura = false;
    assinaturas[index].dataCancelamento = new Date();

    console.log(`O plano foi cancelado com sucesso em ${assinaturas[index].dataCancelamento}.`);
}

function reativaPlano(idUsuario) {
    let index = buscarIndiceDoObjetoPorId(assinaturas, idUsuario);
    assinaturas[index].assinatura = true;
    assinaturas[index].dataCancelamento = -1;
    assinaturas[index].dataComeco = new Date();

    console.log(`O plano foi reativado com sucesso em ${assinaturas[index].dataComeco}.`);
}

function assinarPlano(idPlano, idUsusario, diaVencimento) {
    assinaturas.push({ id: idAssinatura++, idPlano: idPlano, idUsuario: idUsusario, assinatura: true, dataComeco: new Date(), dataCancelamento: -1, diaVencimento: diaVencimento });

    return `Você assinou o plano com sucesso.`;
}

function gerarDebitoMensal(idAssinatura) {
    let assinatura = buscarObjetoPorId(this.assinaturas, idAssinatura);
    let plano = buscarObjetoPorId(this.planos, assinatura.idPlano);
    let dataAtual = new Date()

    const debito = {
        valor: plano.valor,
        descricao: plano.nome,
        dataVencimento: new Date(dataAtual.getFullYear(), dataAtual.getMonth(), assinatura.diaVencimento)
    };

    return debito;
}

// --- FUNÇÕES DE BUSCA ---

function buscarObjetoPorId(lista, id) {
    // Itera pela lista de objetos
    for (let objeto of lista) {
        if (objeto.id == id) {
            return objeto; // Retorna o objeto quando encontra o ID correspondente
        }
    }
    return null; // Retorna null se o objeto não for encontrado
}

function buscarIndiceDoObjetoPorId(lista, id) {
    let count = 0;
    // Itera pela lista de objetos
    for (let objeto of lista) {
        if (objeto.id == id) {
            return count; // Retorna o objeto quando encontra o ID correspondente
        }
        count++
    }
    return null; // Retorna null se o objeto não for encontrado
}