const validator = require('validator');
const User = require('./User');


class Contact {

  constructor (body) {
    this.body = body;
    this.errors = [];
    this.contacts = null;

    this.cleanUp();
  }

  // Organizar os dados recebidos.
  cleanUp() {
    for (const key in this.body) {
      if (typeof key !== 'string') this.body[key] = '';
    }

    this.body = {
      name: this.body.name,
      phone: this.body.phone,
      email: this.body.email,
    }
  }
  
  // Validar os dados do formulário
  validate() {
    if (!this.body.name) {
      this.errors.push('Nome é obrigatório!');
    }

    if (!this.body.phone && !this.body.email) {
      this.errors.push('Telefone ou E-mail obrigatório');
    }

    // const phoneRegExp = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
    // if (!phoneRegExp.test(this.body.phone)) {
    //   this.errors.push('Formato de telefone inválido!');
    // }

    // if (!validator.isEmail(this.body.email)) {
    //   this.errors.push('E-mail inválido!')
    // }
  }


  // Criar um novo contato e adiciona-lo aos contatos do usuário
  async create(userId) {
    this.validate();

    if (this.errors.length > 0) return false;

    // Adicionar os dados no final do array e já ordena-lo em ordem alfabetica
    const user = await User.findUser(userId);
    user.contacts.push(this.body);
    user.contacts = this.sortContacts(user.contacts);

    await user.save();
    return true;
  }

  // Validar - Percorrer o array até a posição do index e depois ordenar o array novamente
  async edit(userId, contactIndex) {
    this.validate();

    if (this.errors.length > 0) return false;

    // Deletar - Adicionar o novo contato - Ordenar contatos
    const user = await User.findUser(userId);
    user.contacts.splice(contactIndex, 1);
    user.contacts.push(this.body);
    user.contacts = this.sortContacts(user.contacts);

    await user.save();
    return true;
  }

  // Ordenar os contatos em ordem alfabetica
  sortContacts(contacts) {
    return contacts.sort((contactA, contactB) => {
      const a = contactA.name.toLowerCase().replace(/[àáâãäå]/,"a").replace(/[èéêë]/,"e").replace(/[ìíîï]/,"i").replace(/[òóôõö]/,"o").replace(/[ùúûü]/,"u").replace(/[ç]/,"c").replace(/[^a-z0-9]/gi,'')
      const b = contactB.name.toLowerCase().replace(/[àáâãäå]/,"a").replace(/[èéêë]/,"e").replace(/[ìíîï]/,"i").replace(/[òóôõö]/,"o").replace(/[ùúûü]/,"u").replace(/[ç]/,"c").replace(/[^a-z0-9]/gi,'')
      // Positivo o b passar a frente de a.
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }


  // MÉTODOS ESTÁTICOS

  // Listagem de usuários
  static async index(userId) {
    const user = await User.findUser(userId);
    
    return user.contacts;
  }


  // Deletar um contato(index) de certo usuário(id)
  static async delete(userId, contactIndex) {
    const user = await User.findUser(userId);
    user.contacts.splice(contactIndex, 1);
    await user.save();
  }
}

module.exports = Contact;