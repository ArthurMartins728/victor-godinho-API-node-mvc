const produtoModel = require('../models/produtoModel');

function dadosValidos({ nome, preco, estoque }) {
  return (
    typeof nome === 'string' &&
    nome.trim() !== '' &&
    Number(preco) >= 0 &&
    Number.isInteger(Number(estoque)) &&
    Number(estoque) >= 0
  );
}

const produtoController = {
  async listar(req, res) {
    try {
      const produtos = await produtoModel.todos();
      res.status(200).json(produtos);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Falha ao listar produtos.' });
    }
  },

  async obter(req, res) {
    try {
      const produto = await produtoModel.porId(req.params.id);
      if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado.' });
      }
      res.status(200).json(produto);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Falha ao buscar produto.' });
    }
  },

  async cadastrar(req, res) {
    if (!dadosValidos(req.body)) {
      return res.status(400).json({
        mensagem: 'Informe nome, preco (>= 0) e estoque (inteiro >= 0).',
      });
    }
    const { nome, preco, estoque } = req.body;
    try {
      const id = await produtoModel.inserir(nome.trim(), preco, estoque);
      res.status(201).json({ id, nome: nome.trim(), preco, estoque });
    } catch (erro) {
      res.status(500).json({ mensagem: 'Falha ao cadastrar produto.' });
    }
  },

  async editar(req, res) {
    if (!dadosValidos(req.body)) {
      return res.status(400).json({
        mensagem: 'Informe nome, preco (>= 0) e estoque (inteiro >= 0).',
      });
    }
    const { nome, preco, estoque } = req.body;
    try {
      const alterou = await produtoModel.alterar(
        req.params.id,
        nome.trim(),
        preco,
        estoque
      );
      if (!alterou) {
        return res.status(404).json({ mensagem: 'Produto não encontrado.' });
      }
      res.status(200).json({ mensagem: 'Produto atualizado com sucesso.' });
    } catch (erro) {
      res.status(500).json({ mensagem: 'Falha ao atualizar produto.' });
    }
  },

  async apagar(req, res) {
    try {
      const apagou = await produtoModel.excluir(req.params.id);
      if (!apagou) {
        return res.status(404).json({ mensagem: 'Produto não encontrado.' });
      }
      res.status(200).json({ mensagem: 'Produto removido com sucesso.' });
    } catch (erro) {
      res.status(500).json({ mensagem: 'Falha ao remover produto.' });
    }
  },
};

module.exports = produtoController;
