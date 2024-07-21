import { con } from "./connection.js";

export async function inserirFilme(filme) {
    const strSQL =
    `
        INSERT INTO 
            tb_filme (
                id_usuario,
                nm_filme,
                ds_sinopse,
                vl_avaliacao,
                dt_lancamento,
                bt_disponivel
            )
            VALUES (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )
    `
    const [resposta] = await con.query(strSQL,
        [
            filme.usuario,
            filme.nome,
            filme.sinopse,
            filme.avaliacao,
            filme.lancamento,
            filme.disponivel
        ]);
    filme.id = resposta.insertId;

    return filme;
}

export async function alterarImagem(imagem, id) {
    const strSQL =
    `
        UPDATE 
            tb_filme
        SET 
            img_filme = ?
        WHERE 
            id_filme = ?  
    `

    const [resposta] = await con.query(strSQL, [imagem, id]);
    return resposta.affectedRows;
}

export async function listarFilmes() {
    const strSQL =
    `
        SELECT
	        id_filme id,
            nm_filme nome,
            vl_avaliacao avaliacao,
            dt_lancamento lancamento,
            bt_disponivel disponivel
        FROM
	        tb_filme;
    `
    const [filmes] = await con.query(strSQL);
    return filmes;
}

export async function listarFilme(id) {
    const strSQL =
    `
        SELECT
            id_filme id,
            nm_filme nome,
            ds_sinopse sinopse,
            vl_avaliacao avaliacao,
            dt_lancamento lancamento,
            bt_disponivel disponivel,
            img_filme capa
        FROM
            tb_filme
        WHERE
            id_filme = ?;
    `
    const [filme] = await con.query(strSQL, [id]);
    return filme[0];
}

export async function listarFilmesPorNome(nome) {
    const strSQL =
    `
        SELECT
            id_filme id,
            nm_filme nome,
            vl_avaliacao avaliacao,
            dt_lancamento lancamento,
            bt_disponivel disponivel
        FROM
            tb_filme
        WHERE
            nm_filme like ?;
    `
    const [filmes] = await con.query(strSQL, [`%${nome}%`]);
    return filmes;
}

export async function removerFilme(id) {
    const strSQL = 
    `
        DELETE FROM tb_filme
            WHERE id_filme = ?

    `
    const [resposta] = await con.query(strSQL, [id]);
    return resposta.affectedRows;
}