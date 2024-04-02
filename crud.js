// Aqui estamos pedindo ajuda para criar nossa loja de brinquedos mágica.
const express = require('express');  // Esta é uma ferramenta que nos ajuda a criar a loja.
const app = express();  // Aqui estamos criando nossa loja e a chamamos de "app".
const PORT = 3000;  // Este é o número especial que diz ao computador onde nossa loja vai ficar.

// Aqui estamos criando um grande armazém para guardar todos os nossos brinquedos mágicos.
let produtos = [];  // Chamamos isso de "lista de produtos".

// Esta é uma parte especial que ensina nossa loja a entender pedidos mágicos feitos com palavras especiais.
app.use(express.json());

// Aqui estamos colocando um grande livro na nossa loja para anotar todos os pedidos mágicos que chegam.
const logHoraMiddleware = (req, res, next) => {
    const horaAtual = new Date().toISOString();  // Aqui estamos olhando o relógio mágico para ver a hora.
    const ipCliente = req.ip; // Obtém o IP do cliente
    console.log(`[${horaAtual}] Nova solicitação recebida de ${ipCliente} para: ${req.method} ${req.originalUrl}`);  // Aqui estamos escrevendo no nosso livro.
    next();  // Isso nos ajuda a passar o pedido mágico para a próxima etapa.
};

app.use(logHoraMiddleware);  // Aqui estamos usando nosso livro especial para registrar os pedidos mágicos.

// Aqui estamos dizendo para nossa loja como responder quando alguém visita nossa loja na internet.
app.get('/', (req, res) => {
    res.json("Sucesso!");  // Aqui estamos dizendo "Oi, bem-vindo à nossa loja mágica!".
});

// Se alguém quiser ver todos os brinquedos mágicos que temos na loja, aqui está como eles podem fazer isso.
app.get('/produtos', (req, res) => { 
    res.json(produtos);  // Aqui mostramos todos os brinquedos mágicos na nossa loja.
});

// Se alguém quiser adicionar um novo brinquedo mágico à nossa loja, aqui está como eles podem fazer isso.
app.post('/produtos', (req, res) => {
    const produto = req.body;  // Aqui pegamos o novo brinquedo mágico que alguém quer adicionar.
    if (!produto.nome || !produto.preco || !produto.descricao) {
        return res.status(400).send('Todos os campos (nome, preço, descrição) são obrigatórios.');
    }

    // Verifique se o preço é um número válido
    if (isNaN(produto.preco) || produto.preco <= 0) {
        return res.status(400).send('O preço deve ser um número válido e maior que zero.');
    }

    // Adicione o produto à lista de produtos
    produto.id = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1; //Aqui se atribui um ID único ao adicionado à lista de produtos.
    produtos.push(produto);
    res.status(201).send('Produto adicionado com sucesso!');  // Aqui dizemos "Brinquedo adicionado com sucesso!".
});

// Se alguém quiser mudar um brinquedo mágico na nossa loja, aqui está como eles podem fazer isso.
app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;  // Aqui encontramos o brinquedo mágico que alguém quer mudar usando um número especial chamado ID.
    const newData = req.body;  // Aqui pegamos as novas informações do brinquedo mágico.
    const index = produtos.findIndex(produto => produto.id === parseInt(id));  // Aqui encontramos a posição do brinquedo mágico na nossa lista.
    produtos[index] = { ...produtos[index], ...newData };  // Aqui fazemos as mudanças no brinquedo mágico.
    res.status(200).send('Produto atualizado com sucesso!');  // Aqui dizemos "Brinquedo atualizado com sucesso!".
});

app.patch('/produtos/:id', (req, res) => { // Rota PATCH para atualizar parcialmente um produto
    const { id } = req.params; // Extrai o parâmetro 'id' da URL da requisição
    const newData = req.body; // Obtém os novos dados do produto a serem atualizados
    const index = produtos.findIndex(produto => produto.id === parseInt(id)); // Encontra o índice do produto na lista de produtos
    if (index === -1) { // Verifica se o produto não foi encontrado na lista
        return res.status(404).send('Produto não encontrado.'); // Retorna um erro 404 se o produto não for encontrado
    }
    produtos[index] = { ...produtos[index], ...newData }; // Atualiza parcialmente o produto com os novos dados
    res.status(200).send('Atualização parcial do produto realizada com sucesso!'); // Retorna uma mensagem de sucesso após a atualização
});

// Se alguém quiser remover um brinquedo mágico da nossa loja, aqui está como eles podem fazer isso.
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;  // Aqui encontramos o brinquedo mágico que alguém quer remover usando um número especial chamado ID.
    const index = produtos.findIndex(produto => produto.id === parseInt(id));  // Aqui encontramos a posição do brinquedo mágico na nossa lista.
    produtos.splice(index, 1);  // Aqui removemos o brinquedo mágico do nosso armazém.
    res.status(200).send('Produto removido com sucesso!');  // Aqui dizemos "Brinquedo removido com sucesso!".
});

// Rota OPTIONS para obter informações sobre as rotas disponíveis
app.options('*', (req, res) => { // Define uma rota OPTIONS para tratar requisições de métodos não-padrão
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Define os métodos permitidos para a origem da requisição
    res.status(200).send('Essas são as rotas disponíveis na loja mágica.'); // Retorna uma resposta com uma mensagem indicando as rotas disponíveis
});

// Aqui estamos abrindo a nossa loja na internet e dizendo ao mundo que estamos prontos para receber pedidos mágicos!
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);  // Aqui dizemos "Loja aberta! Venham visitar!"
});
