const User = require('../models/User');

// Renderizar a página inicial e listar todos os contatos
exports.index = (req, res) => {
  return res.render('index')
}

// Criar um contato
exports.create = async (req, res) => {
  const id = req.params.id;
  const user = await User.findUser(id);
  console.log(user);
  return res.redirect('back');
}


// Editar um contato com base no id
exports.edit = (req, res) => {
  res.send('editando contato');
}


// Deletar um contato com base no id também
exports.delete = (req, res) => {
  res.send('deletando contato');
}
