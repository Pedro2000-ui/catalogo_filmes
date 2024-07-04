import { inserirFilme } from '../repository/filmeRepository.js'

import { Router } from 'express'
const server = Router();

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

export default server;