// Para conseguir acessar as variáveis de ambiente no arquivo .env
import 'dotenv/config'

import usuarioController from './controller/usuarioController.js'
import filmeController from './controller/filmeController.js'


// 
import express from 'express'
// Uma especificação que faz uso de headers do HTTP para informar aos navegadores se determinado recurso pode ser ou não acessado.
import cors from 'cors'

const server = express();
server.use(cors());
// Ativa a opção para que os parâmetros de corpo da requisição possam ser enviados no formato json
server.use(express.json());


// Config dos endpoints
server.use(usuarioController);

// liberar arquivos da storage (para que possamos puxar os arquivos que salvamos)
server.use('/storage/capasFilmes', express.static('storage/capasFilmes'));

// Config dos endpoints
server.use(usuarioController);
server.use(filmeController);

server.listen(process.env.PORT, () => console.log(`API Conectada na Porta ${process.env.PORT}`))