import mysql from 'mysql2';

const conexao = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: '1234',
  database: 'estudos'
}).promise();

export default conexao;