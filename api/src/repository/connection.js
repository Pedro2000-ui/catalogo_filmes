import mysql from 'mysql2/promise'

// Cria a conexão com o banco (função assíncrona)
const con = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB
})

console.log("BD conectado!");

// Exporta a variável, para que possa ser acessada de qualquer local
export { con }