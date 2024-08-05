import { query } from 'express';
import conexao from '../config/db.js';

const createUSer = async (nome, sobrenome, email) => {
  console.log(nome, sobrenome, email)
  const [rows] = await conexao.query('INSERT INTO estudos.clientes (nome, sobrenome, email, data_cadastro) VALUES (?, ?, ?, NOW())', [nome, sobrenome, email]);
  console.log("rows:", rows)
  return rows;
};

const getAllUsers = async () => {
  const [rows] = await conexao.query('SELECT * FROM clientes');
  return rows;
};

const editUserById = async (nome, sobrenome, email, id) => {
  try {
    const query = `
      UPDATE estudos.clientes 
      SET nome = ?, sobrenome = ?, email = ?, data_edicao = NOW()
      WHERE usuario_id = ?
    `;

    console.log("Query:", query);
    const [result] = await conexao.query(query, [nome, sobrenome, email, id]);
    console.log("Id:", id);
    console.log('Usuário atualizado com sucesso:', result);
    return result;

   
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
  }
};


const deleteUSerById = async (id) => {
  try {
    console.log("Id:", id);

    // Verifique se o id está definido e não é nulo
    if (!id) {
      throw new Error("O ID do usuário não foi fornecido.");
    }

    // Executa a query de exclusão
    const [result] = await conexao.query('DELETE FROM clientes WHERE usuario_id = ?', [id]);

    // Log do resultado para depuração
    console.log("Resultado da query:", result);

    // Verifica se alguma linha foi afetada
    if (result && result.affectedRows === 0) {
      console.log(`Nenhum usuário encontrado com o ID: ${id}`);
      return { message: `Nenhum usuário encontrado com o ID: ${id}` };
    }

    console.log(`Usuário com o ID: ${id} foi excluído com sucesso.`);
    return { message: `Usuário com o ID: ${id} foi excluído com sucesso.`, result };
  } catch (error) {
    console.error("Erro ao excluir o usuário:", error.message);
    return { message: "Erro ao excluir o usuário.", error: error.message };
  }
};


export default {
  createUSer,
  getAllUsers,
  editUserById,
  deleteUSerById
};
