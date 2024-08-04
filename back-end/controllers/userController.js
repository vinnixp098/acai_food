import UserModel from '../models/userModel.js';

const createUSer = async (req, res) => {
	const { nome, sobrenome, email } = req.body;
	try {
		const result = await UserModel.createUSer(nome, sobrenome, email);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: 'Não foi possível cadastrar o usuário' });
		}
		res.status(201);
		res.json({ message: 'Usuário cadastrado com sucesso' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteUSerById = async (req, res) => {
	const {usuario_id} = req.body;
	try {
		const result = await UserModel.deleteUSerById(usuario_id);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: 'Não foi possível deletar o usuário' });
		}
		res.json({ message: 'Usuário deletado com sucesso' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getAllUsers = async (req, res) => {
	try {
		const usuarios = await UserModel.getAllUsers();
		res.json(usuarios);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const editUserById = async (req, res) => {
	const { nome, sobrenome, email, usuario_id } = req.body;
	try {
		const result = await UserModel.editUserById(nome, sobrenome, email, usuario_id);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: 'Usuário não encontrado' });
		}
		res.json({ message: 'Nome atualizado com sucesso' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export default {
	createUSer,
	getAllUsers,
	editUserById,
	deleteUSerById
};
