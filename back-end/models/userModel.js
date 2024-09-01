import { query } from 'express';
import conexao from '../config/db.js';

const createUSer = async (nome, sobrenome, email) => {
  const [rows] = await conexao.query('INSERT INTO estudos.clientes (nome, sobrenome, email, data_cadastro) VALUES (?, ?, ?, NOW())', [nome, sobrenome, email]);
  return rows;
};

const getAllUsers = async () => {
  const [rows] = await conexao.query('SELECT * FROM usuarios where excluido = "N"');
  return rows;
};

const editUserById = async (nome, sobrenome, email, id) => {
  try {
    const query = `
      UPDATE estudos.clientes 
      SET nome = ?, sobrenome = ?, email = ?, data_edicao = NOW()
      WHERE usuario_id = ?
    `;

    const [result] = await conexao.query(query, [nome, sobrenome, email, id]);
    return result;

   
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
  }
};


const deleteUSerById = async (id, excluido) => {
  try {
    console.log("Id:", id);

    if (!id) {
      throw new Error("O ID do usuário não foi fornecido.");
    }

    const [result] = await conexao.query('DELETE FROM clientes WHERE usuario_id = ?', [id]);

    if (result && result.affectedRows === 0) {
      console.log(`Nenhum usuário encontrado com o ID: ${id}`);
      return { message: `Nenhum usuário encontrado com o ID: ${id}` };
    }

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
