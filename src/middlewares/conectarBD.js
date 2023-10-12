const mongoose = require('mongoose');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://game-list-back.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

async function conectarBancoDados(req = null, res = null, next = null) {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado ao banco de dados!');
    try { next(); } catch { };
    return mongoose;
  } catch (error) {
    console.error(error);
    tratarErrosEsperados(res, 'Error: Erro ao conectar no banco de dados')
    return error;
  }
}

module.exports = conectarBancoDados;
