const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let planos = [
    { id: 1, nome: 'básico', valor: 'R$19,99' },
    { id: 2, nome: 'Medium', valor: 'R$29,99' },
    { id: 3, nome: 'Premium', valor: 'R$49,99' }

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

function cancelarPlano(nomeDoPlano, dataCancelamento) {
    console.log(`O plano "${nomeDoPlano}" foi cancelado com sucesso em ${dataCancelamento}.`);
}

function assinarPlano(nomeDoPlano, tipoDeAssinatura) {
    // Aqui, você pode adicionar código para armazenar informações da assinatura em um banco de dados.
    // Por simplicidade, estamos apenas retornando uma mensagem de confirmação.

    return `Você assinou o plano "${nomeDoPlano}" com sucesso com a opção de ${tipoDeAssinatura}.`;
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