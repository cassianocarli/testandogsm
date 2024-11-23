const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');  // Para lidar com data e hora
const cors = require('cors');

const app = express();

// Habilitar CORS
app.use(cors());

// Usando a variável de ambiente PORT definida pelo Render
const port = process.env.PORT || 3000;  // Caso a variável de ambiente não esteja definida, usaremos a porta 3000

// Middleware para analisar os dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Variável para armazenar os dados recebidos
let sensorData = [];

// Rota para receber os dados do Arduino
app.post('/api/data', (req, res) => {
  const distance = req.body.distance;
  
  if (distance) {
    // Adiciona o timestamp à distância recebida
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    
    // Armazenando os dados (distância e timestamp)
    sensorData.push({ distance, timestamp });
    
    // Exibindo os dados recebidos no terminal
    console.log(`Distância recebida: ${distance} cm | Hora: ${timestamp}`);

    // Retorna sucesso
    res.status(200).json({ message: 'Dados recebidos com sucesso!', data: { distance, timestamp } });
  } else {
    res.status(400).json({ message: 'Distância não fornecida' });
  }
});

// Rota para consultar os dados armazenados
app.get('/api/data', (req, res) => {
  res.status(200).json({ data: sensorData });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
