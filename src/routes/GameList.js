require('dotenv').config();
const express = require('express');
const axios = require('axios');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
const router = express.Router();
const conectarBancoDados = require('../middlewares/conectarBD');
const EsquemaComments = require('../models/comments.js');
const mongoose = require('mongoose'); 

const apiUrl = 'https://api.rawg.io/api/games';
const apiKey = (process.env.APIKEY);

// Rota para obter detalhes de um jogo específico
router.get('/games/:id', async function (req, res) {
  const gameId = req.params.id;
  try {
    // #swagger.tags = ['Game List']

    const response = await axios.get(`${apiUrl}/${gameId}`, {
      params: {
        key: apiKey
      }
    });

    if (response.status !== 200) {
      throw new Error('Erro ao obter dados da API da RAWG');
    }

    const gameDetails = response.data; // Dados do jogo específico

    res.status(200).json({
      status: "OK",
      statusMensagem: "Detalhes do jogo obtidos com sucesso.",
      jogo: gameDetails
    });

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

// Rota para pesquisar jogos por nome
router.get('/games', async function (req, res) {
  const query = req.query.search;
  try {
    // #swagger.tags = ['Game List']

    const response = await axios.get(apiUrl, {
      params: {
        key: apiKey,
        search: query
      }
    });

    if (response.status !== 200) {
      throw new Error('Erro ao obter dados da API da RAWG');
    }

    const gamesList = response.data.results; // Lista de jogos correspondentes à pesquisa

    res.status(200).json({
      status: "OK",
      statusMensagem: "Lista de jogos obtida com sucesso.",
      jogos: gamesList
    });

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

router.get('/games/:id/comments', conectarBancoDados, async function (req, res) {
  const gameId = req.params.id;
  console.log("gameId:", gameId);

  try {
    // #swagger.tags = ['Comments']
    const comments = await EsquemaComments.find({ gameId });
    console.log("gameId:", gameId);
    res.status(200).json({
      status: "OK",
      statusMensagem: "Comentários obtidos com sucesso.",
      comments
    });
  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

// Rota para adicionar um comentário a um jogo específico
router.post('/games/:id/comments', conectarBancoDados, async function (req, res) {
  const gameId = req.params.id;
  let {name, comment} = req.body;

  try {
    // #swagger.tags = ['Comments']
    const newComment = new EsquemaComments({ gameId, name,comment });
    const savedComment = await newComment.save(); // Use .save() para salvar o novo comentário

    res.status(201).json({
      status: "Created",
      statusMensagem: "Comentário adicionado com sucesso.",
      comment: savedComment // Devolva o comentário salvo na resposta
    });
  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

router.delete('/games/:gameId/comments/:commentId', conectarBancoDados, async function (req, res) {
  const gameId = req.params.gameId;
  const commentId = req.params.commentId;

  try {
    // #swagger.tags = ['Comments']
    const deletedComment = await EsquemaComments.findOneAndDelete({ _id: commentId, gameId });

    if (!deletedComment) {
      // Se o comentário não foi encontrado, retorne um erro 404 (Not Found)
      return res.status(404).json({
        status: "Erro",
        statusMensagem: "Comentário não encontrado."
      });
    }

    res.status(200).json({
      status: "OK",
      statusMensagem: "Comentário excluído com sucesso.",
      comment: deletedComment
    });
  } catch (error) {
    // Se ocorrer um erro durante a exclusão, retorne um erro 500 (Internal Server Error)
    return res.status(500).json({
      status: "Erro",
      statusMensagem: "Erro ao excluir o comentário.",
      error: error.message
    });
  }
});

module.exports = router;


module.exports = router;
