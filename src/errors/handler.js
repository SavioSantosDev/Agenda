// Middlewares para manipulação de erros.

// Apenas logar o erro e passa-lo adiante para o próximo middleware
const errorHandler = (err, req, res, next) => {

  if (err.code === 'EBADCSRFTOKEN') {
    console.error({error: 'CSRF Token inválido!'});
  
  } else {
    console.error(err)
  }

  return res.status(500).render('500');
}

module.exports = errorHandler;
