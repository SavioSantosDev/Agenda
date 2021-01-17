const routes = require('express').Router();
const { loginRequired } = require('./middlewares/middlewares');

// Controllers
const contactController = require('./controllers/contactController');
const userController = require('./controllers/userController');

// Home page
routes.get('/', (req, res) => {
  return res.status(200).render('index');
});

// ENTRAR - REGISTRAR - SAIR de uma conta
routes.get('/entrar', userController.loginPage);
routes.post('/entrar', userController.login);

routes.get('/cadastrar', userController.registerPage);
routes.post('/cadastrar', userController.register);

routes.get('/sair', userController.logout);

// Contatos do usuário
routes.get('/contatos/:userId', loginRequired, contactController.index);
routes.post('/contatos/:userId/criar-contato', loginRequired, contactController.create);
routes.post('/contatos/:userId/editar/:contactIndex', loginRequired, contactController.edit);
routes.get('/contatos/:userId/excluir/:contactIndex', loginRequired, contactController.delete);


// Rota não existente
routes.use((req, res) => {
  res.status(404).render('404');
  return;
});

module.exports = routes;
