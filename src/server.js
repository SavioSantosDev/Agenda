require('dotenv').config();
const express = require('express');
const path =    require('path');
const helmet =  require('helmet');
const flash =   require('connect-flash');
const csrf =    require('csurf');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const routes = require('./routes');
const errorHandler = require('./errors/handler');
const { locals, csrfToken} = require('./middlewares/middlewares');

const app = express();

app.use(helmet());

// Fazendo a conexão com o banco de dados
mongoose.connect(process.env.CONNECTIONBD, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    app.emit('connection-success');
  }).catch(e => console.log(e));

const sessionOptions = session({
  secret: 'alsdkfjlalçsdf',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions);
app.use(flash());


// parsing dos dados recebidos por requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Configurando as views e a views enjine que será utilizada
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(locals);
app.use(csrfToken);
app.use(routes);

// Middlewares para manipulação de erros;
app.use(errorHandler);

// Quando a conexão com o banco de dados for finalizada, ouvir uma porta local.
app.on('connection-success', () => {
  const port = 3333;
  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  });
})




