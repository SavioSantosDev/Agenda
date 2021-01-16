const User = require('../models/User');

// Renderizar a página de criação de usuário
exports.registerPage = (req, res) => {
  if (req.session.user) return res.redirect('/');
  return res.render('register');
}

// Chamar o model para criar o usuário
exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    // Se ocorreu algum erro de validação com os dados passados
    if (!await user.register()) {
      req.flash('errors', user.errors);
      res.status(400);
      return req.session.save(() => res.redirect('back'));
    }

    // Se tudo ocorreu bem é porque o usuári foi criado com sucesso!
    req.flash('success', 'Usuário criado com sucesso!');
    return req.session.save(() => res.status(200).redirect('/entrar'));
  
  // Algum erro no servidor!
  } catch (e) {
    console.error(e);
    return res.status(500).render('500');
  }
}


// Renderizar a página de logar com um usuário
exports.loginPage = (req, res) => {
  if (req.session.user) return res.redirect('/');
  return res.render('login');
}


// Chamar o model para o usuário entrar em uma conta
exports.login = async (req, res) => {
  try {
    const user = new User(req.body);

    // Se houve algum erro do usuário ao logar
    if (!await user.login()) {
      req.flash('errors', user.errors);
      return req.session.save(() => res.status(400).redirect('back'));
    }

    // Se tudo ocorreu bem. Não há necessidade de uma flash message aqui
    req.session.user = user.user;
    return req.session.save(() => res.status(200).redirect('/'));

  // Erro do servidor
  } catch(e) {
    console.error(e);
    return res.render('500');
  }
}


// Sair da conta
exports.logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
}