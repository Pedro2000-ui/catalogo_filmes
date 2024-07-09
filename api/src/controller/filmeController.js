import { alterarImagem, inserirFilme } from '../repository/filmeRepository.js'

// Biblioteca utilizada para trabalhar com imagens enviadas pelos endpoints
import multer from 'multer'
import { Router } from 'express'

const server = Router();

// especifica o caminho onde serão salvas as imagens
const upload = multer({ dest: 'storage/capasFilmes' })


server.post('/filme', async(req, resp) => {
    try {
        const novoFilme = req.body

        if (!novoFilme.nome) 
            throw new Error('Obrigatório preencher o nome');
        if (!novoFilme.sinopse)
            throw new Error('Obrigatório preencher a sinopse');
        if (!novoFilme.avaliacao && novoFilme.avaliacao != 0)
            throw new Error('Obrigatório preencher a avaliação');
        if (!novoFilme.lancamento)
            throw new Error('Obrigatório preencher a data de lançamento');
        if (!novoFilme.disponivel)
            throw new Error('Obrigatório preencher o campo disponível');
        if (!novoFilme.usuario)
            throw new Error('Usuário não logado!');

        const filme = await inserirFilme(novoFilme);

        resp.send(filme);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

/* 
 / upload.single('capa')
 / .single = especifica que só ira receber 1 imagem
 / ('capa') = nome do campo que virá a imagem, quando anexarmos e enviados pelo endpoint
*/

server.put('/filme/:id/capa', upload.single('capa'), async(req, resp) => {
    try {
        const { id } = req.params;
        const img = req.file.path;
        const retorno = await alterarImagem(img, id);
        
        if(retorno != 1) 
            throw new Error("Erro ao alterar imagem.")
        
        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default server;