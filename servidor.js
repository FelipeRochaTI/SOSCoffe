const express = require('express');
const bodyParser = require('body-parser');
let assinaturas = [{}];
let usuarios = [{}];


const app = express();
app.use(bodyParser.json());

let planos = [
    { nome: 'básico', valor: 'R$19,99' },
    { nome: 'Medium', valor: 'R$29,99' },
    { nome: 'Premium', valor: 'R$49,99' }

]; // Array para armazenar os planos

let idContador = 0;

// Rota para adicionar um novo plano
app.post('/planos', (req, res) => {
    const novoPlano = req.body;
    planos.push(novoPlano);
    res.send('Plano adicionado com sucesso');
});

//Rota para retornar todos os planos
app.get('/planos', (req, res) => {
    res.json(planos);
});

//Rota para retornar plano por ID
app.get('/planos/:id', (req, res) => {
    const id = req.params.id;
    res.json(planos[id]);
});

// Rota para atualizar um plano existente
app.put('/planos/:id', (req, res) => {
    const id = req.params.id;
    const novoPlano = req.body;
    planos[id] = novoPlano;
    res.send('Plano atualizado com sucesso');
});

// Rota para remover um plano existente
app.delete('/planos/:id', (req, res) => {
    const id = req.params.id;
    planos.splice(id, 1);
    res.send('Plano removido com sucesso');
});

const PORT = 3000; // Porta em que o servidor será executado
app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
});

function cancelarPlano(lista, idUsusario) {

    console.log(`O plano "${nomeDoPlano}" foi cancelado com sucesso em ${dataCancelamento}.`);
}

function assinarPlano(idPlano, idUsusario) {
    assinaturas += { idPlano: idPlano, idUsusario: idUsusario, assinatura: true, dataComeco: new Date() }

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

function buscarObjetoPorId(lista, id) {
    // Itera pela lista de objetos
    for (const objeto of lista) {
        if (objeto.id === id) {
            return objeto; // Retorna o objeto quando encontra o ID correspondente
        }
    }
    return null; // Retorna null se o objeto não for encontrado
}
