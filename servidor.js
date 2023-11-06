const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 3000; // Porta em que o servidor será executado
app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
});

// Array para armazenar os planos (contendo exemplos sem id)
let planos = [
    { nome: 'básico', valor: 'R$19,99' },
    { nome: 'Medium', valor: 'R$29,99' },
    { nome: 'Premium', valor: 'R$49,99' }
];

let usuarios = [
    { nome: 'básico', valor: 'R$19,99' },
    { nome: 'Medium', valor: 'R$29,99' },
    { nome: 'Premium', valor: 'R$49,99' }
]; // Array para armazenar os usuarios

let assinaturas = [{}]; // Array para armazenar os assinaturas

//Contadores para id
let idPlano = 0;
let idUsuario = 0;
let idAssinatura = 0;


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
    res.send(assinarPlano(req.params.idPlano, req.params.idUsuario));
});

//ARRUMAR
//Rota para retornar todos os planos
app.get('/sub/assinaturas', (req, res) => {
    res.json(assinaturas);
});

// Rota para cancelamento de assinatura
app.put('/sub/cancelaAssinatura/:id', (req, res) => {
    res.send(cancelarPlano(req.params.id));
});


// --- ROTAS DE USUÁRIOS ---


// --- FUNÇÕES DE MANIPULAÇÃO ---

function cancelarPlano(idUsusario) {
    let plano = buscarObjetoPorId(this.assinaturas, idUsusario);
    plano.assinatura = false;
    plano.dataCancelamento = new Date();

    console.log(`O plano foi cancelado com sucesso em ${plano.dataCancelamento}.`);
}

function assinarPlano(idPlano, idUsusario) {
    this.assinaturas += { id: idAssinatura++, idPlano: idPlano, idUsusario: idUsusario, assinatura: true, dataComeco: new Date(), dataCancelamento: -1 }

    return `Você assinou o plano com sucesso.`;
}

function gerarDebitoMensal(valor, descricao, dataVencimento) {
    // Aqui você pode adicionar código para armazenar ou processar o débito mensal, como registrá-lo em um sistema financeiro.

    const debito = {
        valor: valor,
        descricao: descricao,
        dataVencimento: dataVencimento,
    };

    // Exemplo de saída: retorna o objeto do débito gerado.
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