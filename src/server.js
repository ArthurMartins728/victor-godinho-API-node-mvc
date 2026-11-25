require('dotenv').config();
const express = require('express');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Produtos no ar.' });
});

app.use('/produtos', produtoRoutes);

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => {
  console.log(`API de produtos rodando em http://localhost:${PORTA}`);
});
