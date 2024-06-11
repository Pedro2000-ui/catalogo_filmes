// Variável de conexão com o banco de dados
import { con } from './connection.js'

export async function login(email, senha) {
    const strSQL =
        `SELECT 
            id_usuario  id,
            nm_usuario  nome,
            ds_email    email
        FROM
            tb_usuario
        WHERE
            ds_email    = ? AND
            ds_senha    = ? `

    // O retorno da query é um array com as linhas e outros metadados.
    // quando colocamos "[linhas]"" estamos desestruturando o array (ou seja, o retorno da query), pegando o indice 0 desse array e salvando na variável linhas
    const [linhas] = await con.query(strSQL, [email, senha]);
    return linhas[0];

}