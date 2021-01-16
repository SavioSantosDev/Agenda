const validator = require('validator');
const User = require('./User');


class Contact {

  constructor (body) {
    this.body = body;
    this.errors = [];
    this.contact = null;

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

    const phoneRegExp = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
    if (!phoneRegExp.test(this.body.phone)) {
      this.errors.push('Formato de telefone inválido!');
    }

    if (!validator.isEamil(this.body.email)) {
      this.errors.push('E-mail inválido!')
    }
  }
}