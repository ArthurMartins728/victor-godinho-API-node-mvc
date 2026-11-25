const db = require('../config/db');

const produtoModel = {
  async todos() {
    const [linhas] = await db.query(
      'SELECT id, nome, preco, estoque FROM produtos ORDER BY nome'
    );
    return linhas;
  },

  async porId(id) {
    const [linhas] = await db.query(
      'SELECT id, nome, preco, estoque FROM produtos WHERE id = ?',
      [id]
    );
    return linhas[0] || null;
  },

  async inserir(nome, preco, estoque) {
    const [resultado] = await db.query(
      'INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)',
      [nome, preco, estoque]
    );
    return resultado.insertId;
  },

  async alterar(id, nome, preco, estoque) {
    const [resultado] = await db.query(
      'UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?',
      [nome, preco, estoque, id]
    );
    return resultado.affectedRows > 0;
  },

  async excluir(id) {
    const [resultado] = await db.query(
      'DELETE FROM produtos WHERE id = ?',
      [id]
    );
    return resultado.affectedRows > 0;
  },
};

module.exports = produtoModel;
