import mysql from 'mysql2/promise'

// Cria a conexão com o banco (função assíncrona)
const con = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
    typeCast: function (field, next) {
        if (field.type === 'TINY' && field.length === 1) {
            return (field.string() === '1');
        } else {
            return next();
        }
    }
})

console.log("BD conectado!");

// Exporta a variável, para que possa ser acessada de qualquer local
export { con }