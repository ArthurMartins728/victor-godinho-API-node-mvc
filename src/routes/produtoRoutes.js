const { Router } = require('express');
const produtoController = require('../controllers/produtoController');

const rotas = Router();

rotas.get('/', produtoController.listar);
rotas.get('/:id', produtoController.obter);
rotas.post('/', produtoController.cadastrar);
rotas.put('/:id', produtoController.editar);
rotas.delete('/:id', produtoController.apagar);

module.exports = rotas;
