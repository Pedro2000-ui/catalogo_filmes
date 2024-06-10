// Para conseguir acessar as variáveis de ambiente no arquivo .env
import 'dotenv/config'
// Variável de conexão com o banco de dados
import { con } from './repository/connection.js'
// 
import express from 'express'
// Uma especificação que faz uso de headers do HTTP para informar aos navegadores se determinado recurso pode ser ou não acessado.
import cors from 'cors'

const server = express();
server.use(cors());

// Ativa a opção para que os parâmetros de corpo da requisição possam ser enviados no formato json
server.use(express.json());

server.listen(process.env.PORT, () => console.log(`API Conectada na Porta ${process.env.PORT}`))