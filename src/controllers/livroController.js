const pool = require("../config/db");

const cadastrarLivro = async (req, res) => {
  const { titulo, autor, editora, quantidade, genero } = req.body;

  try {
    const query = `
            INSERT INTO livros (titulo, autor, editora, quantidade_total, quantidade_disponivel, genero)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

    const valores = [titulo, autor, editora, quantidade, quantidade, genero];
    const resultado = await pool.query(query, valores);

    res.status(201).json({
      mensagem: "Livro cadastrado com sucesso!",
      livro: resultado.rows[0],
    });
  } catch (error) {
    console.error("Erro ao cadastrar livro:", error);

    res.status(500).json({ erro: "Erro interno no servidor." });
  }
};

const listarLivros = async (req, res) => {
  try {
    // Busca todos os livros e ordena pelo ID (do mais antigo pro mais novo)
    const resultado = await pool.query("SELECT * FROM livros ORDER BY id ASC");

    res.json(resultado.rows);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
};

module.exports = { cadastrarLivro, listarLivros };
