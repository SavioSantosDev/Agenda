# Agenda de contatos

Será desenvolvido um CRUD básico de uma agenda de contatos utilizando padrão MVC com Node.js

Para iniciar o servidor na porta 3000 rode `npm start`.


### Servidor

Para o desenvolvimento do servidor será utilizado o **express**, e como ferramenta de desenvolvimento, o **nodemon** será utilizado para observar quando houver alterações em nosso código e atualizar o servidor automaticamente.


### Models

É o detentor dos dados recebidos pelo controller, e tem a responsabilidade de gerenciar e manipular os dados da aplicação (ler, escrever, editar, VALIDAR etc) por meio da lógica de uma negócio estabelecida.

Para modelagem de dados e conexão com o banco de dados (MongoDB) será utilizada o **mongoose**. O **connect-mogo** para salvar as sessões no banco de dados em vez de salva-las na memória.

> O MongoDB, por ser um banco noSQL, não está nem aí para como os dados serão salvos na "tabela", por isso o mongoose será utilizado para tratar e salvar os dados da forma que queremos.

### Views

É a cama de interação com o usuário - a interface, eventos, informações etc - seja por meio de HTML ou XML. Neste projeto será utilizado a biblioteca **ejs** para escrevermos JavaScript em "HTML".


### Controllers

Responsável por receber todas as requisições feitas pelo usuário, controlando qual model utilizar para manipular os dados recebidos e qual view será mostrada como resposta para tal requisição. Basicamnete é o intermediador entre MODEL e VIEW.


## Middlewares

Quando uma rota é acessada podemos passar um middleware que executará uma determinada ação antes do controller ser chamado. Pode ser passado globalmente para ser chamado em todas as rotas, ou ser chamado apenas em rotas específicas. Além do *request* e *response* ele recebe um terceiro parâmetro, o *next* servindo basicamente para chamar o próximo middleware (caso tenha) ou o controller.


### Segurança básica

**bcryptjs**: Biblioteca para "criptografar" dados sensíveis como CPF, RG, Senhas.. que serão salvos no banco de dados, para caso os dados sejam expostos não seja possível reverter para texto limpo mesmo utilizando *rainbow tables* ou utilizando ataques de *força bruta*.

**csurf**: Cross-site request forgery (CSRF) é um ataque em que invasores enviam solicitações de domínios não autorizados para o nosso back end, fazendo coisas maliciosas. Para evitar isso, precisamos enviar um token CSRF para usuários autorizados e verificar o token CSRF em nossas solicitações.

**helmet**: Biblioteca de uso recomendado pelo Node que ajuda a proteger a aplicação de algumas vulnerabilidades bastante conhecidas,configurando os cabeçalhos HTTP adequadamente.


## Utilidades

- **dotenv**: Cria variáveis de ambiente dentro do repositório que serão utilizada apenas para desenvolvimento local.

- **express-session**: Identificar o navegador de um usuário, utilizar cookies para fazer algumas coisas como autenticação por exemplo.

- **connect-flash** Mensagens autodestrutivas, lidas uma única vez apenas para dar feedback para o usuário.

- **validator**: Para validação de dados.
