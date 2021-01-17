const User = require('../models/User');
const Contact = require('../models/Contact');

// Renderizar a página inicial e listar todos os contatos em ordem alfabética
exports.index = async (req, res) => {
  try {
    const userId = req.params.userId;
    const contacts = await Contact.index(userId);
    return res.render('contacts', { contacts });

  } catch (e) {
    console.log(e);
    return res.status(500).render('500');
  }
}

// Criar um contato
exports.create = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = req.body;
  
    const contact = new Contact(data);

    if (!await contact.create(userId)) {
      req.flash('errors', contact.errors);
      res.status(400);
      return req.session.save(() => res.redirect('back'));
    }
    
    return res.status(200).redirect('back');

  } catch (e) {
    console.error(e);
    return res.status(500).render('500');
  }
}


// Editar um contato com base no id
exports.edit = async (req, res) => {
  try {
    const { userId, contactIndex } = req.params;

    const contact = new Contact(req.body);

    if (!await contact.edit(userId, contactIndex)) {
      req.flash('errors', contact.errors);
      res.status(400);
      return req.session.save(() => res.redirect('back'));
    }

    return res.status(200).redirect('back');

  } catch(e) {
    console.error(e);
    return res.status(500).render('500');
  }
}


// Deletar um contato com base no id também
exports.delete = async (req, res) => {
  try {
    const { userId, contactIndex } = req.params;
    await Contact.delete(userId, contactIndex);
    return res.status(200).redirect('back');

  } catch (e) {
    console.log(e);
    return res.status(500).render('500');
  }
}
