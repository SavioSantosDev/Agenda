const validator = require('validator');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// Cada usuário terá, além de seus dados pessoais para autenticação, um array contendo todos os contatos cadastrados

const contactSchema = new mongoose.Schema({
  name:   { type: String, required: true, unique: true },
  phone:  String,
  email:  String,
  date:   { type: Date, default: Date.now() }
});

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contacts: [ contactSchema ]
});

const UserModel = mongoose.model('user', userSchema);


class User {

  constructor (body) {
    this.body = body;   // Campos do formulário.
    this.errors = [];   // Erros para validação e autenticação.
    this.user = null;   // O usuário que será retornado caso tudo der certo.

    this.cleanUp();
  }


  // Getters para os campos
  getName() { return this.body.name; }
  getEmail() { return this.body.email; }
  getPassword() { return this.body.password; }

  setPassword(newPassword) { this.body.password = newPassword; }


  /**
   * Organizar os dados do formulário
   */
  cleanUp() {
    // Primeiro converter todos os campos para string caso necessário
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') this.body[key] = '';
    }

    // Garantir que o objeto terá apenas os campos abaixo
    this.body = {
      name: this.getName() || '',
      email: this.getEmail(),
      password: this.getPassword(),
    }
  }


  /**
   * Logar usuário em uma conta,
   */
  async login() {

    // Checar validação dos dados
    this.validate();

    // Se o usuário existe ou não
    if (!await this.userExists()) {
      this.errors.push('Usuário não existe');
    }

    if (this.errors.length > 0) return false;

    // Checar se a senha é válida para este usuário
    if (!bcryptjs.compareSync(this.getPassword(), this.user.password)) {
      this.errors.push('Senha inválida!');
      this.user = null;
      return false;
    }

    // Usuário logado com sucesso!
    return true;
  }
  

  /**
   * Método para regsitrar um usuário
   */
  async register() {

    // Se houver algum erro de validação retornar false;
    this.validate();

    // Campo nome é exclusivo apenas do formulário de registro
    if (this.getName().length < 3 || this.getName().length > 50) {
      this.errors.push('Nome precisar ter entre 3 e 50 caracteres!');
    }
    
    if (await this.userExists()) {
      this.errors.push('Usuário já existe!');
    }

    if (this.errors.length > 0) return false;

    // Se deu tudo certo, vamos "encriptografar" a senha
    const salt = bcryptjs.genSaltSync();
    const newPassword = bcryptjs.hashSync(  this.getPassword(), salt  );
    this.setPassword(newPassword);

    // Criando o usuário
    await UserModel.create(this.body);
    return true;
  }


  /**
   * Checar se o usuário já existe com base no email
   */
  async userExists() {
    this.user = await UserModel.findOne({ email: this.getEmail() });
    return this.user ? true : false;
  }


  /**
   * Validar os campos
   * Email: Precisa ser um email válido
   * Senha: Mais de 8 caracteres e menos de 40
   */
  validate() {
    if (!validator.isEmail(this.getEmail())) {
      this.errors.push('E-mail inválido!');
    }
    if (this.getPassword().length < 8 || this.getPassword().length > 40) {
      this.errors.push('Senha precisa ter entre 8 e 40 caracteres!')
    }
  }


  // MÉTODOS ESTÁTICOS -----

  /**
   * Buscar um usuário pelo email
   */
  static async findUser(id) {
    if (typeof id !== 'string') return;
    return await UserModel.findById(id);
  } 
}

module.exports = User;
