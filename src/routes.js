const routes = require('express').Router();
const { loginRequired } = require('./middlewares/middlewares');

// Controllers
const contactController = require('./controllers/contactController');
const userController = require('./controllers/userController');

// Home page / Contacts
routes.get('/', contactController.index);
routes.post('/criar-contato/:id', loginRequired, contactController.create);
routes.get('/editar-contato/:id', loginRequired, contactController.edit);
routes.get('/excluir-contato/:id', loginRequired, contactController.delete);

// ENTRAR - REGISTRAR - SAIR de uma conta
routes.get('/entrar', userController.loginPage);
routes.post('/entrar', userController.login);

routes.get('/cadastrar', userController.registerPage);
routes.post('/cadastrar', userController.register);

routes.get('/sair', userController.logout);


// Rota não existente
routes.use((req, res) => {
  res.status(404).render('404');
  return;
});

module.exports = routes;
