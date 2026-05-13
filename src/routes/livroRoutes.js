const express = require("express");
const router = express.Router();
const livroController = require("../controllers/livroController");
const {
  verificarToken,
  apenasBibliotecario,
} = require("../middlewares/authMiddleware");

// ROTA PROTEGIDA: api/livros
// passa pelo verificador de token, verificador de perfil, e só então chega no cadastro
router.post(
  "/livros",
  verificarToken,
  apenasBibliotecario,
  livroController.cadastrarLivro
);

// Rota de LISTAGEM (Protegida: Requer apenas Token de quem está logado)
router.get("/livros", verificarToken, livroController.listarLivros);

// Rota para deletar livro (Note o DELETE e a proteção dupla)
router.delete(
  "/livros/:id",
  verificarToken,
  apenasBibliotecario,
  livroController.removerLivro
);

module.exports = router;
